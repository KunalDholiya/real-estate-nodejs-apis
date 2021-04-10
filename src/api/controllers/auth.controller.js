const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const authService = require('./../services/auth.service')
const { jwtSecret, jwtExpirationInterval } = require('../../config/vars');

function JWTGenerate(id) {
    return jwt.sign(
        { id },
        jwtSecret,
        { expiresIn: jwtExpirationInterval }
    );
}

exports.register = async (req, res, next) => {
    const user = req.body;

    try {
        await authService.createUser(user, (err, data) => {
            if (err) {
                return next(err);
            } else {
                const generateToken = JWTGenerate(data.insertId);
                res.status(httpStatus.CREATED);
                return res.json({ token: generateToken });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.login = async (req, res, next) => {
    const user = req.body;

    try {
        await authService.logIn(user, (err, data) => {
            if (err) {
                return next(err);
            } else {
                const generateToken = JWTGenerate(data.id);
                res.status(httpStatus.CREATED);
                return res.json({ token: generateToken, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.me = async (req, res, next) => {
    try {
        return res.json({ data: req.user });
    } catch (error) {
        return next(error);
    }
};