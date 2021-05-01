const pool = require("./../../config/sql");

exports.addActivity = (data, parent_id, user_id, cb) => {
    pool.query(
        "INSERT INTO `activity_logs` (parent_id, lead_id, activity_by, activity_type, activity_details) VALUES (?, ?, ?, ?, ?)",
        [
            parent_id,
            data.lead_id,
            user_id,
            data.activity_type,
            JSON.stringify(data.activity_details)
        ],
        (err, data) => {
            if (err) {
                console.error("Add activity error: ", err);
                return cb("Internal server error!");
            } else {
                return cb(null, 'Activity added successfully!');
            }
        }
    );
};

exports.getActivityById = (activity_id, parent_id, cb) => {
    pool.query(
        "SELECT * FROM `activity_logs` WHERE `id` = ? AND `parent_id` = ? AND `status` = ?",
        [activity_id, parent_id, "active"],
        (err, activity) => {
            if (err) {
                return cb(err);
            } else {
                if (activity.length > 0) {
                    activity = activity[0];
                    return cb(null, activity);
                } else {
                    return cb("Activity does not exist in system!");
                }
            }
        }
    );
};

exports.getActivityByLead = (lead_id, parent_id, cb) => {
    pool.query(
        "SELECT * FROM `activity_logs` WHERE `lead_id` = ? AND `parent_id` = ?",
        [lead_id, parent_id],
        (err, lead_activity) => {
            if (err) {
                return cb(err);
            } else {
                return cb(null, lead_activity);
            }
        }
    );
};

exports.updateActivity = (activity_id, parent_id, data, cb) => {
    this.getActivityById(activity_id, parent_id, (err, activity_old_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query(
                "UPDATE `activity_logs` SET `activity_type` = ? WHERE `id` = ? AND `parent_id` = ?",
                [
                    JSON.stringify(data.activity_type),
                    lead_id,
                    parent_id
                ],
                (err, updated) => {
                    if (err) {
                        return cb(err);
                    } else {
                        let activityData = {
                            lead_id: lead_id,
                            activity_type: 'lead_updated',
                            activity_details: {
                                lead_stage_before: lead_data_old,
                                lead_stage_after: data
                            }
                        }

                        activityService.addActivity(activityData, parent_id, user_id, (err, data) => {
                            if (err) {
                                return cb(err);
                            } else {
                                return cb(null, "Lead updated successfully!");
                            }
                        });
                    }
                }
            );
        }
    });
};