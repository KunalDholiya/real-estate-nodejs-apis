const projectService = require('./../services/project.service')

exports.getProjects = (req, res, next) => {
    try {
        projectService.getProjects(req.user.parent_id, req.user.id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.getProjectById = (req, res, next) => {
    try {
        let project_id = req.params.id;

        projectService.getProjectById(project_id, req.user.parent_id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.addProject = (req, res, next) => {
    try {
        projectService.addProject(req.body, req.user.parent_id, req.user.id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.updateProjects = (req, res, next) => {
    try {
        let project_id = req.params.id;

        projectService.updateProject(project_id, req.user.parent_id, req.body, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.removeProject = (req, res, next) => {
    try {
        
    } catch (error) {
        return next(error);
    }
};