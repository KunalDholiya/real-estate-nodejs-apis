const activityService = require('./../services/activity.service')


exports.getActivityByLeadId = (req, res, next) => {
    try {
        let activity_id = req.params.id;

        activityService.getActivityByLead(activity_id, req.user.parent_id, (err, data) => {
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


exports.addActivities = (req, res, next) => {
    try {

        activityService.addActivity(req.body, req.user.parent_id, req.user.id, (err, data) => {
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

exports.updateActivity = (req, res, next) => {
    try {
        let activity_id = req.params.id;

        activityService.updateActivity(activity_id, req.user.parent_id, req.body, (err, data) => {
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

