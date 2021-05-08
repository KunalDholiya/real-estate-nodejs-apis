const pool = require('./../../config/sql');


exports.getEstimates = (parent_id, user_id, cb) => {
    pool.query('SELECT * FROM `estimate` WHERE `parent_id` = ? AND `user_id` = ? AND `status` = ?', [parent_id, user_id, 'active'], (err, estimates) => {
        if (err) {
            return cb(err);
        } else {
            if (estimates.length > 0) {
                estimates.forEach(estimate => {
                    estimate.estimate_data = JSON.parse(estimate.estimate_data)
                });

                return cb(null, estimates);
            } else {
                return cb('Estimate does not exist in system!');
            }
        }
    })
}

exports.getEstimateById = (estimate_id, parent_id, cb) => {
    pool.query('SELECT * FROM `estimate` WHERE `id` = ? AND `parent_id` = ? AND `status` = ?', [estimate_id, parent_id, 'active'], (err, estimate) => {
        if (err) {
            return cb(err);
        } else {
            if (estimate.length > 0) {

                estimate = estimate[0];
                try {
                    estimate.estimate_data = JSON.parse(estimate.estimate_data)
                } catch(e) {
                    console.error("Estimate config parsing error: ", e);
                    return cb('Internal server error!')
                }

                return cb(null, estimate);
            } else {
                return cb('Estimate does not exist in system!');
            }
        }
    })
}

exports.getEstimateByLeadId = (lead_id, parent_id, cb) => {
    pool.query('SELECT * FROM `estimate` WHERE `lead_id` = ? AND `parent_id` = ? AND `status` = ?', [lead_id, parent_id, 'active'], (err, estimate) => {
        if (err) {
            return cb(err);
        } else {
            if (estimate.length > 0) {

                estimate = estimate[0];
                try {
                    estimate.estimate_data = JSON.parse(estimate.estimate_data)
                } catch(e) {
                    console.error("Estimate config parsing error: ", e);
                    return cb('Internal server error!')
                }

                return cb(null, estimate);
            } else {
                return cb('Estimate does not exist in system!');
            }
        }
    })
}

exports.addEstimate = (data, parent_id, user_id, cb) => {
    if (data.hasOwnProperty('estimate_data') && Object.keys(data.estimate_data).length > 0) {

        pool.query("INSERT INTO `estimate` (parent_id, user_id, lead_id, date_of_estimate, estimate_data, total_estimate) VALUES (?,?,?,?,?,?)",
            [
                parent_id,
                user_id,
                data.lead_id,
                data.date_of_estimate,
                JSON.stringify(data.estimate_data),
                data.total_estimate
            ], (err, inserted) => {
                if (err) {
                    console.error("Add estimate error: ", err);
                    return cb('Internal server error!');
                } else {
                    return cb(null, 'Estimate is added successfully!');
                }
            });
    } else {
        return cb('Please add estimate data!');
    }
}

exports.updateEstimate = (estimate_id, parent_id, data, cb) => {
    this.getEstimateById(estimate_id, parent_id, (err, estimate_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query('UPDATE `estimate` SET `date_of_estimate` = ?, `estimate_data` = ?, `total_estimate` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?',
            [
                data.date_of_estimate,
                JSON.stringify(data.estimate_data),
                data.total_estimate,
                estimate_id,
                parent_id,
                'active'
            ], (err, updated) => {
                if (err) {
                    return cb(err);
                } else {
                    return cb(null, 'Estimate is updated successfully!');
                }
            })
        }
    })
}

exports.deleteEstimate = (estimate_id, parent_id, data, cb) => {
    this.getEstimateById(estimate_id, parent_id, (err, estimate_d) => {
        if (err) {
            return cb(err);
        } else {
            pool.query('UPDATE `estimate` SET `status` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?',
            [
                'deleted',
                estimate_id,
                parent_id,
                'active'
            ], (err, updated) => {
                if (err) {
                    return cb(err);
                } else {
                    return cb(null, 'Estimate is deleted successfully!');
                }
            })
        }
    })
}