const pool = require("./../../config/sql");
const activityService = require("./activity.service");

exports.getLeads = (parent_id, user_id, cb) => {
    pool.query(
        "SELECT * FROM `leads` WHERE `parent_id` = ? AND `user_id` = ? AND `status` = ?",
        [parent_id, user_id, "active"],
        (err, leads) => {
            if (err) {
                return cb(err);
            } else {
                if (leads.length > 0) {
                    return cb(null, leads);
                } else {
                    return cb("Leads does not exist in system!");
                }
            }
        }
    );
};

exports.getLeadById = (lead_id, parent_id, cb) => {
    pool.query(
        "SELECT * FROM `leads` WHERE `id` = ? AND `parent_id` = ? AND `status` = ?",
        [lead_id, parent_id, "active"],
        (err, lead) => {
            if (err) {
                return cb(err);
            } else {
                if (lead.length > 0) {
                    lead = lead[0];
                    return cb(null, lead);
                } else {
                    return cb("Lead does not exist in system!");
                }
            }
        }
    );
};

exports.addLead = (data, parent_id, user_id, cb) => {
    pool.query(
        "INSERT INTO `leads` (parent_id, user_id, property_id, first_name, last_name, mobile_number, email, inquiry_date, followup_date, site_visit_date, source_of_promotion, lead_owner, lead_stage, address, alter_mobile_number, fax, birth_date, marriage_date, social_media_links, company, website, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            parent_id,
            user_id,
            data.property_id,
            data.first_name,
            data.last_name,
            data.mobile_number,
            data.email,
            data.inquiry_date,
            data.followup_date,
            data.site_visit_date,
            data.source_of_promotion,
            data.lead_owner,
            data.lead_stage,
            data.address,
            data.alter_mobile_number,
            data.fax,
            data.birth_date,
            data.marriage_date,
            data.social_media_links,
            data.company,
            data.website,
            data.notes,
        ],
        (err, data) => {
            if (err) {
                console.error("Add lead error: ", err);
                return cb("Internal server error!");
            } else {
                return cb(null, "Lead added successfully!");
            }
        }
    );
};

exports.updateProject = (lead_id, parent_id, data, cb) => {
    this.getLeadById(lead_id, parent_id, (err, lead_data_old) => {
        if (err) {
            return cb(err);
        } else {
            pool.query(
                "UPDATE `leads` SET `property_id`=?, `first_name` = ?, `last_name` = ?, `mobile_number` = ?, `email` = ?, `inquiry_date` = ?, `followup_date` = ?, `site_visit_date` = ?, `source_of_promotion` = ?, `lead_owner` = ?, `lead_stage` = ?, `address` = ?, `alter_mobile_number` = ?, `fax` = ?, `birth_date` = ?, `marriage_date` = ?, `social_media_links` = ?, `company` = ?, `website` = ?, `notes` = ? WHERE `id` = ? AND `parent_id` = ?",
                [
                    data.property_id,
                    data.first_name,
                    data.last_name,
                    data.mobile_number,
                    data.email,
                    data.inquiry_date,
                    data.followup_date,
                    data.site_visit_date,
                    data.source_of_promotion,
                    data.lead_owner,
                    data.lead_stage,
                    data.address,
                    data.alter_mobile_number,
                    data.fax,
                    data.birth_date,
                    data.marriage_date,
                    data.social_media_links,
                    data.company,
                    data.website,
                    data.notes,
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

exports.deleteLead = (lead_id, parent_id, user_id, cb) => {
    this.getLeadById(lead_id, parent_id, (err, lead_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query(
                "UPDATE `leads` SET `status` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?",
                ["deleted", lead_id, parent_id, "active"],
                (err, updated) => {
                    if (err) {
                        return cb(err);
                    } else {
                        let activityData = {
                            lead_id: lead_id,
                            activity_type: 'lead_delete',
                            activity_details: {
                                lead_stage_before: lead_data.status,
                                lead_stage_after: 'deleted'
                            }
                        }

                        activityService.addActivity(activityData, parent_id, user_id, (err, data) => {
                            if (err) {
                                return cb(err);
                            } else {
                                return cb(null, "Lead is deleted successfully!");
                            }
                        });
                    }
                }
            );
        }
    });
};


exports.leadStageChange = (lead_id, parent_id, user_id, data, cb) => {
    this.getLeadById(lead_id, parent_id, (err, lead_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query(
                "UPDATE `leads` SET `lead_stage` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?",
                [data.lead_stage, lead_id, parent_id, "active"],
                (err, updated) => {
                    if (err) {
                        return cb(err);
                    } else {

                        let activityData = {
                            lead_id: lead_id,
                            activity_type: 'lead_stage',
                            activity_details: {
                                lead_stage_before: lead_data.lead_stage,
                                lead_stage_after: data.lead_stage
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
