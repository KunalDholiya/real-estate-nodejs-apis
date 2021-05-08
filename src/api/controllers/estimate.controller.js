const estimateService = require('./../services/estimate.service')

exports.getEstimate = (req, res, next) => {
    try {
        estimateService.getEstimates(req.user.parent_id, req.user.id, (err, data) => {
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

exports.getEstimateById = (req, res, next) => {
    try {
        let estimate_id = req.params.id;

        estimateService.getEstimateById(estimate_id, req.user.parent_id, (err, data) => {
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

exports.getEstimateByLead = (req, res, next) => {
    try {
        let lead_id = req.params.id;

        estimateService.getEstimateByLeadId(lead_id, req.user.parent_id, (err, data) => {
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

exports.addEstimate = (req, res, next) => {
    try {
        estimateService.addEstimate(req.body, req.user.parent_id, req.user.id, (err, data) => {
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

exports.updateEstimates = (req, res, next) => {
    try {
        let estimate_id = req.params.id;

        estimateService.updateEstimate(estimate_id, req.user.parent_id, req.body, (err, data) => {
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

exports.removeEstimate = (req, res, next) => {
    try {
        let estimate_id = req.params.id;

        estimateService.deleteEstimate(estimate_id, req.user.parent_id, req.body, (err, data) => {
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