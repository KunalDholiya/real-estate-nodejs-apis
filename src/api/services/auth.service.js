const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { omit } = require('lodash');
const pool = require('./../../config/sql')

exports.createUser = async (data, cb) => {

    const rounds = env === 'dev' ? 1 : 10;

    let password = await bcrypt.hash(data.password, rounds);

    await pool.query("INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`, `role`, `profile_pic`, `phone_number`, `address`) VALUES (?,?,?,?,?,?,?,?)", [
        data.first_name,
        data.last_name,
        data.email,
        password,
        data.role,
        data.profile_pic,
        data.phone_number,
        data.address,
    ], (err, resp) => {
        if (err) {
            return cb(err);
        } else {
            return cb(null, resp);
        }
    })
}

exports.logIn = async (data, cb) => {
    await pool.query('SELECT * FROM `user` WHERE email = ?', [data.email], (err, user) => {
        if (err) {
            return cb(err);
        } else {
            if (user.length > 0) {
                let checkPassword = bcrypt.compare(data.password, user[0].password);
                if (checkPassword) {
                    user = omit(user[0], 'password');
                    return cb(null, user)
                } else {
                    return cb('Please enter valid email or password');
                }
            } else {
                return cb('Please enter valid email or password');
            }
        }
    })
}

exports.getUserById = async (id, cb) => {
    await pool.query('SELECT * FROM `user` WHERE id = ? AND status = ?', [id, 'active'], (err, user) => {
        if (err) {
            return cb(err);
        } else {
            if (user.length > 0) {
                user = omit(user[0], 'password');
                return cb(null, user)
            } else {
                return cb('Internal Server Error');
            }
        }
    })
}