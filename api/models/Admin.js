/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

let bcrypt = require('bcrypt');

module.exports = {
  tableName: 'site_users',
  attributes: {
    email: {
      type: 'string',
      required: true
    },
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    pass: {
      type: 'string',
    },
    createdAt: false,
    updatedAt: false
  },

  beforeCreate: function(values, next) {
    console.log('values:', values);
    bcrypt.hash(values.password, 10, (err, hash) => {
      console.log('hash:', hash);
      if(err) {return next(err);}
      values.pass = hash;
      delete values.password;
      next();
    });
  }
};
