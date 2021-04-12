const httpStatus = require('http-status');
const authService = require('./../services/auth.service')


exports.addTeamMember = async (req, res, next) => {
    const user = req.body;

    try {
        await authService.createUser(user, req.user.parent_id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                authService.getUserById(data.insertedId, (err, user_details) => {
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