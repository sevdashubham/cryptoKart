/**
 * Commission.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  autoPk: false,
  tableName: 'user_commissions',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    receiverId: {
      type: 'number',
      required: true
    },
    traderId: {
      type: 'number',
      required: true
    },
    totalOrderAmount: {
      type: 'number'
    },
    orderId: {
      type: 'number',
      allowNull: true
    },
    currencyId: {
      type: 'number',
      required: true
    },
    commissionAmount: {
      type: 'number'
    },
    createdAt: {
      type: 'ref', columnType: 'datetime'
    },
    updatedAt: {
      type: 'ref', columnType: 'datetime'
    }
  },
};

