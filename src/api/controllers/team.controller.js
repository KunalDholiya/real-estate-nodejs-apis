const authService = require('./../services/auth.service')

exports.addTeamMember = async (req, res, next) => {
    const user = req.body;

    try {
        await authService.createUser(user, req.user.parent_id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                authService.getUserById(data.insertId, (err, user_details) => {
                    if (err) {
                        return res.status(500).send({ success: false, error: err });
                    } else {
                        return res.json({ success: true, data: user_details });
                    }
                })

            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.updateTeamMember = async (req, res, next) => {
    const user = req.body;
    const update_id = req.params.id;

    try {
        await authService.updateUser(user, update_id, req.user.parent_id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data: 'User Updated Successfully' });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.getMembers = (req, res, next) => {
    try {
        authService.getUsers(req.user.parent_id, (err, data) => {
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