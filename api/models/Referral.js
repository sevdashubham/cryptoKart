/**
 * Referral.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  autoPk: false,
  tableName: 'user_referral',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    userId: {
      type: 'number',
      required: true,
      unique: true
    },
    referralCode: {
      type: 'string',
      required: true,
      unique: true
    },
    referralCodeUsed: {
      type: 'string',
      allowNull: true
    },
    createdAt: {
      type: 'ref', columnType: 'datetime'
    },
    updatedAt: {
      type: 'ref', columnType: 'datetime'
    }
  },

  beforeCreate: function(values, next) {
    values.referralCode = "CRYP" + values.userId;
    next();
  }

};

