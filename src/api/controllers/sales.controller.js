const salesService = require('./../services/sales.service')

exports.getSales = (req, res, next) => {
    try {

        salesService.getSales(req.user.parent_id, req.user.id, (err, data) => {
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

exports.getSalesById = (req, res, next) => {
    try {
        let sales_id = req.params.id;

        salesService.getSalesById(sales_id, req.user.parent_id, (err, data) => {
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

exports.getSalesByProjectId = (req, res, next) => {
    try {
        let project_id = req.params.id;

        salesService.getSalesById(project_id, req.user.parent_id, (err, data) => {
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

exports.addSales = (req, res, next) => {
    try {
        salesService.addSales(req.body, req.user.parent_id, req.user.id, (err, data) => {
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

exports.updateSales = (req, res, next) => {
    try {
        let sales_id = req.params.id;

        salesService.updateSales(sales_id, req.user.parent_id, req.body, (err, data) => {
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

exports.deleteSales = (req, res, next) => {
    try {
        let sales_id = req.params.id;

        salesService.deleteSales(sales_id, req.user.parent_id, req.body, (err, data) => {
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