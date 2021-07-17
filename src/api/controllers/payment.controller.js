const paymentService = require('./../services/payment.service')

exports.getReceivedPayments = (req, res, next) => {
    try {
        paymentService.getReceivedPayments(req.user.parent_id, req.user.id, (err, data) => {
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

exports.getDuePayments = (req, res, next) => {
    try {
        paymentService.getDuePayments(req.user.parent_id, req.user.id, (err, data) => {
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

exports.getReceivedPaymentByContact = (req, res, next) => {
    try {
        let lead_id = req.params.id;

        paymentService.getReceivedPaymentByContact(lead_id, req.user.parent_id, (err, data) => {
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

exports.addPayment = (req, res, next) => {
    try {

        paymentService.addPayment(req.body, req.user.parent_id, req.user.id, (err, data) => {
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

exports.editReceivedPayment = (req, res, next) => {
    try {
        let lead_id = req.params.id;

        paymentService.editReceivedPayment(lead_id, req.user.parent_id, req.body, (err, data) => {
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

exports.deleteReceivedPayment = (req, res, next) => {
    try {
        let lead_id = req.params.id;

        paymentService.deleteReceivedPayment(lead_id, req.user.parent_id, req.user.id, (err, data) => {
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