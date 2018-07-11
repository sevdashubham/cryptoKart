/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

let bcrypt = require('bcrypt');

// module.exports = {
//
//   attributes: {
//     email: {
//       type: 'string',
//       required: true,
//       // unique: true
//     },
//     hashedPassword: {
//       type: 'string',
//     },
//     // Override toJSON method to remove password from API
//     // toJSON: function() {
//     //   var obj = this.toObject();
//     //   delete obj.password;
//     //   return obj;
//     // }
//     // customToJSON: function() {
//     //   return _.omit(this, ['hashedPassword']);
//     // },
//   },
//
//   beforeCreate: function(values, next){
//     bcrypt.hash(values.password, 10, (err, hash) => {
//       if(err) {return next(err);}
//       values.hashedPassword = hash;
//       delete values.password;
//       next();
//     });
//   }
//
// };

// User Model As Per Cryptokart PHP DB

module.exports = {
  tableName: 'site_users',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
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
