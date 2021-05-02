const contactService = require('./../services/contact.service')

exports.getContacts = (req, res, next) => {
    try {
        contactService.getContacts(req.user.parent_id, req.user.id, (err, data) => {
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

exports.getContactById = (req, res, next) => {
    try {
        let contact_id = req.params.id;

        contactService.getContactById(contact_id, req.user.parent_id, (err, data) => {
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

exports.addContact = (req, res, next) => {
    try {

        contactService.addContact(req.body, req.user.parent_id, req.user.id, (err, data) => {
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

exports.updateContact = (req, res, next) => {
    try {
        let contact_id = req.params.id;

        contactService.updateContact(contact_id, req.user.parent_id, req.body, (err, data) => {
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

exports.deleteContact = (req, res, next) => {
    try {
        let contact_id = req.params.id;

        contactService.deleteContact(contact_id, req.user.parent_id, req.user.id, (err, data) => {
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