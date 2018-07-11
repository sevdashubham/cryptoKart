/**
 * User_Balances.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'site_users_balances',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    balance: {
      type: 'number'
    },
    site_user: {
      type: 'number'
    },
    currency: {
      type: 'number'
    },
    createdAt: false,
    updatedAt: false
  },

};

