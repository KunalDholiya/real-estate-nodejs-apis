const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

exports.protect = (req, res, cb) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).send({
            success: false,
            data: 'Not authorized to access this route'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        authService.getUserById(decoded.id, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send({
                    success: false,
                    error: err
                });
            } else { 
                req.user = data;
                cb(null, true)
            }
        });
    } catch (err) {
        res.status(401).send({
            success: false,
            data: 'Not authorized to access this route'
        });
    }
}