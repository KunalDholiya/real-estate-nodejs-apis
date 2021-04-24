const bcrypt = require('bcryptjs');
const { omit } = require('lodash');
const pool = require('./../../config/sql');
const { env } = require('../../config/vars');
var SqlString = require('sqlstring');

exports.createAccount = (data, cb) => {
    this.checkAccountExists(data.email, data.phone_number, (err, notExist) => {
        if (err) {
            return cb(err);
        } else {
            if (notExist) {
                pool.query("INSERT INTO `accounts` (`company_logo`, `owner_name`, `company_name`, `company_email`, `company_website`,`company_address`, `company_phone_no`) VALUES (?,?,?,?,?,?,?)", [
                    data.company_logo,
                    data.owner_name,
                    data.company_name,
                    data.company_email,
                    data.company_website,
                    data.company_address,
                    data.company_phone_no
                ], (err, resp) => {
                    if (err) {
                        return cb(err);
                    } else {
                        let userData = {
                            first_name: data.owner_name,
                            last_name: '',
                            email: data.company_email,
                            password: data.password,
                            role: data.role,
                            profile_pic: data.company_logo,
                            phone_number: data.company_phone_no,
                            address: data.company_address,
                        }

                        this.createUser(userData, resp.insertId, (err, user) => {
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

    let password = null;
    
    bcrypt.hash(data.password, rounds, (err, pass) => {
        if(err) {
            console.log("Hashing error :>", err)
            return cb(err);
        } else {
            password = pass;
        }
    });

    this.checkUserExists(data.email, data.phone_number, (err, notExist) => {
        if (err) {
            return cb(err);
        } else {
            if (notExist) {
                pool.query("INSERT INTO `user` (`parent_id`, `first_name`, `last_name`, `email`, `password`, `role`, `profile_pic`, `phone_number`, `address`) VALUES (?,?,?,?,?,?,?,?,?)", [
                    parent_id,
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

exports.updateUser = (data, update_id, parent_id, cb) => {
    pool.query('SELECT * FROM `user` WHERE `id` = ? AND `parent_id` = ?', [update_id, parent_id], (err, user) => {
        if (err) {
            return cb(err);
        } else {
            if (user.length > 0) {
                pool.query('UPDATE `user` SET `first_name` = ?, `last_name` = ?, `email` = ?, `phone_number` = ?, `address` = ? WHERE `parent_id` = ? AND `id` = ?', [
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.phone_number,
                    data.address,
                    parent_id,
                    update_id
                ], (err, resp) => {
                    if (err) {
                        return cb(err);
                    } else {
                        return cb(null, 'User updated successfully');
                    }
                });
            } else { 
                return cb('User does not exist in system!');
            }
        }
    })
}

exports.getUsers = (parent_id, cb) => {
    pool.query('SELECT * FROM `user` WHERE `parent_id` = ?', [parent_id], (err, user) => {
        if (err) {
            return cb(err);
        } else {
            if (user.length > 0) {
                return cb(null, user);
            } else { 
                return cb('User does not exist in system!');
            }
        }
    })
}

exports.deleteUser = (id, parent_id, cb) => {
    pool.query('DELETE FROM `user` WHERE `id` = ? AND `parent_id` = ?', [id, parent_id], (err, user) => {
        if (err) {
            return cb(err);
        } else {
            if (user.length > 0) {
                return cb(null, 'User deleted successfully');
            } else { 
                return cb(null, 'Internal Server Error');
            }
        }
    })
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
    pool.query('SELECT * FROM `accounts` WHERE company_email = ? OR company_phone_no = ?', [email, phone_number], (err, user) => {
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