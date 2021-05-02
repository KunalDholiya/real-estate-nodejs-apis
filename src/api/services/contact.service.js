const pool = require("./../../config/sql");

exports.getContacts = (parent_id, user_id, cb) => {
    pool.query(
        "SELECT * FROM `contact` WHERE `parent_id` = ? AND `user_id` = ? AND `status` = ?",
        [parent_id, user_id, "active"],
        (err, contacts) => {
            if (err) {
                return cb(err);
            } else {
                if (contacts.length > 0) {
                    return cb(null, contacts);
                } else {
                    return cb("Contacts does not exist in system!");
                }
            }
        }
    );
};

exports.getContactById = (lead_id, parent_id, cb) => {
    pool.query(
        "SELECT * FROM `contact` WHERE `id` = ? AND `parent_id` = ? AND `status` = ?",
        [lead_id, parent_id, "active"],
        (err, contact) => {
            if (err) {
                return cb(err);
            } else {
                if (contact.length > 0) {
                    contact = contact[0];
                    return cb(null, contact);
                } else {
                    return cb("Contact does not exist in system!");
                }
            }
        }
    );
};

exports.addContact = (data, parent_id, user_id, cb) => {
    pool.query(
        "INSERT INTO `contact` (parent_id, user_id, first_name, last_name, mobile_number, email, alternative_mobile_no, phone, fax, source_of_promotion, birth_date, marriage_date, company, website, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            parent_id,
            user_id,
            data.first_name,
            data.last_name,
            data.mobile_number,
            data.email,
            data.alternative_mobile_no,
            data.phone,
            data.fax,
            data.source_of_promotion,
            data.birth_date,
            data.marriage_date,
            data.company,
            data.website,
            data.notes
        ],
        (err, data) => {
            if (err) {
                console.error("Add Contact error: ", err);
                return cb("Internal server error!");
            } else {
                return cb(null, "Contact added successfully!");
            }
        }
    );
};

exports.updateContact = (contact_id, parent_id, data, cb) => {
    this.getContactById(contact_id, parent_id, (err, contact_old_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query(
                "UPDATE `contact` SET `first_name` = ?, `last_name` = ?, `mobile_number` = ?, `email` = ?, `alternative_mobile_no` = ?, `phone` = ?, `fax` = ?, `source_of_promotion` = ?, `birth_date` = ?, `marriage_date` = ?, `company` = ?, `website` = ?, `notes` = ? WHERE `id` = ? AND `parent_id` = ?",
                [
                    data.first_name,
                    data.last_name,
                    data.mobile_number,
                    data.email,
                    data.alternative_mobile_no,
                    data.phone,
                    data.fax,
                    data.source_of_promotion,
                    data.birth_date,
                    data.marriage_date,
                    data.company,
                    data.website,
                    data.notes,
                    contact_id,
                    parent_id
                ],
                (err, updated) => {
                    if (err) {
                        return cb(err);
                    } else {
                        return cb(null, "Contact updated successfully!");
                    }
                }
            );
        }
    });
};

exports.deleteContact = (contact_id, parent_id, user_id, cb) => {
    this.getContactById(contact_id, parent_id, (err, lead_data) => {
        if (err) {
            return cb(err);
        } else {
            pool.query(
                "UPDATE `contact` SET `status` = ? WHERE `id` = ? AND `parent_id` = ? AND `status` = ?",
                ["deleted", contact_id, parent_id, "active"],
                (err, updated) => {
                    if (err) {
                        return cb(err);
                    } else {
                        return cb(null, "Contact is deleted successfully!");
                    }
                }
            );
        }
    });
};