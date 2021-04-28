const pool = require('./../../config/sql');


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
    pool.query('SELECT * FROM `projects` WHERE `id` = ? AND `parent_id` = ? AND `status` = ?', [project_id, parent_id, 'active'], (err, project) => {
        if (err) {
            return cb(err);
        } else {
            if (project.length > 0) {

                project = project[0];
                try {
                    project.project_config = JSON.parse(project.project_config)
                } catch(e) {
                    console.error("Project config parsing error: ", e);
                    return cb('Internal server error!')
                }

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
            ], (err, data) => {
                if (err) {
                    console.error("Add Project error: ", err);
                    return cb('Internal server error!');
                } else {
                    return cb(null, 'Project is configured successfully!');
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