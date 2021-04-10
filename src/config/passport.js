const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('./vars');
const { getUserById } = require('./../api/services/auth.service')
const jwtOptions = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
    try {
        await getUserById(payload.sub, (err, data) => {
            if (err) {
                return next(err);
            } else {
                if (data) {
                    return done(null, data);

                } else {
                    return done(null, false);

                }
            }
        })
    } catch (error) {
        return done(error, false);
    }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);