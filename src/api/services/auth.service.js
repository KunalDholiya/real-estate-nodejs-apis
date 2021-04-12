const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { omit } = require('lodash');
const pool = require('./../../config/sql');
const { env } = require('../../config/vars');


exports.createAccount = (data, cb) => {
    this.checkAccountExists(data.email, data.phone_number, (err, notExist) => {
        if (err) {
            return cb(err);
        } else {
            if (notExist) {
                pool.query("INSERT INTO `account` (`company_logo`, `owner_name`, `company_name`, `company_email`, `company_website`,`company_address`) VALUES (?,?,?,?,?,?)", [
                    data.company_logo,
                    data.owner_name,
                    data.company_name,
                    data.company_email,
                    data.company_website,
                    data.company_address
                ], (err, resp) => {
                    if (err) {
                        return cb(err);
                    } else {
                        let userData = {
                            first_name: data.owner_name,
                            last_name: '',
                            email: data.company_email,
                            password: data.password,
                            role: 'owner',
                            profile_pic: data.company_logo,
                            phone_number: data.company_phone_no,
                            address: data.company_address,
                        }

                        this.createUser(userData, resp.insertedId, (err, user) => {
                            if (err) {
                                return cb(err);
                            } else {
                                return cb(null, user);
                            }
                        })
                    }
                })
            }
        }
    });
}


exports.createUser = (data, parent_id, cb) => {

    const rounds = env === 'development' ? 1 : 10;

    let password = bcrypt.hash(data.password, rounds);

    this.checkUserExists(data.email, data.phone_number, (err, notExist) => {
        if (err) {
            return cb(err);
        } else {
            if (notExist) {
                pool.query("INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`, `role`, `profile_pic`, `phone_number`, `address`) VALUES (?,?,?,?,?,?,?,?)", [
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
        }
    });
}

exports.logIn = (data, cb) => {
    pool.query('SELECT * FROM `user` WHERE email = ?', [data.email], (err, user) => {
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

exports.getUserById = (id, cb) => {
    pool.query('SELECT * FROM `user` WHERE id = ? AND status = ?', [id, 'active'], (err, user) => {
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

exports.checkUserExists = (email, phone_number, cb) => {
    pool.query('SELECT * FROM `user` WHERE email = ? OR phone_number = ?', [email, phone_number], (err, user) => {
        if (err) {
            return cb(err);
        } else {
            if (user.length > 0) {
                return cb('User is already exists with us!')
            } else {
                return cb(null, true);
            }
        }
    })
}

exports.checkAccountExists = (email, phone_number, cb) => {
    pool.query('SELECT * FROM `account` WHERE email = ? OR phone_number = ?', [email, phone_number], (err, user) => {
        if (err) {
            return cb(err);
        } else {
            if (user.length > 0) {
                return cb('Account is already exists with us!')
            } else {
                return cb(null, true);
            }
        }
    })
}