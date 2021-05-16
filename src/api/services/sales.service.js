const pool = require('./../../config/sql');

exports.getSales = (parent_id, user_id, cb) => {
    pool.query('SELECT * FROM `sales` WHERE `parent_id` = ? AND `user_id` = ? AND `status` = ?', [parent_id, user_id, 'active'], (err, sales) => {
        if (err) {
            return cb(err);
        } else {
            if (sales.length > 0) {
                return cb(null, sales);
            } else {
                return cb('Sales does not exist in system!');
            }
        }
    })
}

exports.getSalesById = (sale_id, parent_id, cb) => {
    pool.query('SELECT * FROM `sales` WHERE `id` = ? AND `parent_id` = ? AND `status` = ?', [sale_id, parent_id, 'active'], (err, sale) => {
        if (err) {
            return cb(err);
        } else {
            if (sale.length > 0) {
                sale = sale[0];
                return cb(null, project);
            } else {
                return cb('Sale does not exist in system!');
            }
        }
    })
}

exports.addSales = (data, parent_id, user_id, cb) => {

    pool.query("INSERT INTO `sales` (`parent_id`,`user_id`,`project_id`,`contact_id`,`lead_id`,`property`,`sales_type`,`purchase_date`,`total_amount`) VALUES (?,?,?,?,?,?,?,?,?)",
        [
            parent_id,
            user_id,
            data.project_id,
            data.contact_id,
            data.lead_id,
            data.property,
            data.sales_type,
            data.purchase_date,
            data.total_amount,
        ], (err, inserted) => {
            if (err) {
                console.error("Add Sales error: ", err);
                return cb('Internal server error!');
            } else {
                return cb(null, 'Sales added successfully!');
            }
        });

}

exports.updateSales = (sales_id, parent_id, data, cb) => {
    this.getSalesById(sales_id, parent_id, (err, project_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query('UPDATE `projects` SET `contact_id` = ?, `lead_id` = ?, `property` = ?, `sales_type` = ?, `purchase_date` = ?, `total_amount` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?',
                [
                    data.contact_id,
                    data.lead_id,
                    data.property,
                    data.sales_type,
                    data.purchase_date,
                    data.total_amount,
                    sales_id,
                    parent_id,
                    'active'
                ], (err, updated) => {
                    if (err) {
                        return cb(err);
                    } else {
                        return cb(null, 'Sales updated successfully!');
                    }
                })
        }
    })
}

exports.deleteSales = (sales_id, parent_id, data, cb) => {
    this.getSalesById(sales_id, parent_id, (err, project_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query('UPDATE `sales` SET `status` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?',
                [
                    'deleted',
                    sales_id,
                    parent_id,
                    'active'
                ], (err, updated) => {
                    if (err) {
                        return cb(err);
                    } else {
                        return cb(null, 'Sales deleted successfully!');
                    }
                })
        }
    })
}