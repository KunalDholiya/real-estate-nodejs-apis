const leadService = require('./../services/lead.service')

exports.getLeads = (req, res, next) => {
    try {
        leadService.getLeads(req.user.parent_id, req.user.id, (err, data) => {
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

exports.getLeadById = (req, res, next) => {
    try {
        let project_id = req.params.id;

        leadService.getLeadById(project_id, req.user.parent_id, (err, data) => {
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

exports.addLead = (req, res, next) => {
    try {

        leadService.addLead(req.body, req.user.parent_id, req.user.id, (err, data) => {
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

exports.updateLead = (req, res, next) => {
    try {
        let project_id = req.params.id;

        leadService.updateLead(project_id, req.user.parent_id, req.body, (err, data) => {
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

exports.deleteLead = (req, res, next) => {
    try {
        let project_id = req.params.id;

        leadService.deleteLead(project_id, req.user.parent_id, (err, data) => {
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

exports.leadStageChange = (req, res, next) => {
    try {
        let project_id = req.params.id;

        leadService.leadStageChange(project_id, req.user.parent_id, req.body, (err, data) => {
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