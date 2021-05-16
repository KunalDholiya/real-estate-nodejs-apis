const pool = require('./../../config/sql');
const utils = require('./../utils/utils')


exports.getProjects = (parent_id, user_id, cb) => {
    pool.query('SELECT * FROM `projects` WHERE `parent_id` = ? AND `user_id` = ? AND `status` = ?', [parent_id, user_id, 'active'], (err, projects) => {
        if (err) {
            return cb(err);
        } else {
            if (projects.length > 0) {
                projects.forEach(project => {
                    project.project_config = JSON.parse(project.project_config)
                });

                return cb(null, projects);
            } else {
                return cb('Project does not exist in system!');
            }
        }
    })
}

exports.getProjectById = (project_id, parent_id, cb) => {
    pool.query('SELECT p.project_logo, p.project_name, p.project_address, p.project_rera_number, pud.contact_id, pud.unit_name, pud.unit_floor, pud.unit_name, pud.unit_status FROM `projects` as p LEFT JOIN `project_unit_details` as pud ON p.id = pud.project_id WHERE p.id = ? AND p.parent_id = ? AND p.status = ?', [project_id, parent_id, 'active'], (err, project) => {
        if (err) {
            return cb(err);
        } else {
            if (project.length > 0) {
                return cb(null, project);
            } else {
                return cb('Project does not exist in system!');
            }
        }
    })
}

exports.addProject = (data, parent_id, user_id, cb) => {
    if (data.hasOwnProperty('project_config') && Object.keys(data.project_config).length > 0) {

        pool.query("INSERT INTO `projects` (parent_id, user_id, project_logo, project_name,project_address, project_contact, project_email, project_rera_number, project_attachment, project_config ) VALUES (?, ?,?, ?,?, ?,?, ?,?,?)",
            [
                parent_id,
                user_id,
                data.project_logo,
                data.project_name,
                data.project_address,
                data.project_contact,
                data.project_email,
                data.project_rera_number,
                data.project_attachment.length > 0 ? data.project_attachment : null,
                JSON.stringify(data.project_config)
            ], (err, inserted) => {
                if (err) {
                    console.error("Add Project error: ", err);
                    return cb('Internal server error!');
                } else {
                    let project_id = inserted.insertId;
                    utils.insertUnits(data.project_config, parent_id, project_id, (err, insertComplete) => {
                        if (err) {
                            console.error("Add Project error: ", err);
                            return cb('Internal server error!');
                        } else {
                            pool.query("INSERT INTO `project_unit_details` (`parent_id`,`project_id`,`unit_number`,`unit_floor`,`unit_name`) VALUES ?", 
                            [insertComplete], (err, bulkInsert) => {
                                if (err) {
                                    console.error("Add Project error: ", err);
                                    return cb('Internal server error!');
                                } else {
                                    return cb(null, 'Project is configured successfully!');
                                }
                            })
                        }
                    })
                }
            });
    } else {
        return cb('Please add project configuration!');
    }
}

exports.updateProject = (project_id, parent_id, data, cb) => {
    this.getProjectById(project_id, parent_id, (err, project_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query('UPDATE `projects` SET `project_name` = ?, `project_address` = ?, `project_contact` = ?, `project_email` = ?, `project_rera_number` = ?, `project_config` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?',
            [
                data.project_name,
                data.project_address,
                data.project_contact,
                data.project_email,
                data.project_rera_number,
                JSON.stringify(data.project_config),
                project_id,
                parent_id,
                'active'
            ], (err, updated) => {
                if (err) {
                    return cb(err);
                } else {
                    return cb(null, 'Project is updated successfully!');
                }
            })
        }
    })
}

exports.deleteProject = (project_id, parent_id, data, cb) => {
    this.getProjectById(project_id, parent_id, (err, project_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query('UPDATE `projects` SET `status` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?',
            [
                'deleted',
                project_id,
                parent_id,
                'active'
            ], (err, updated) => {
                if (err) {
                    return cb(err);
                } else {
                    return cb(null, 'Project is deleted successfully!');
                }
            })
        }
    })
}