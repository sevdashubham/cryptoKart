/**
 * AuthCode
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'oauth_authcode',
  attributes: {

    code: {
      type: 'string'
    },
    userId: {
      type: 'number',
      required: true
    },
    clientId: {
      type: 'string',
      required: true
    },
    redirectURI: {
      type: 'string',
      required: true
    },
    createdAt: {
      type: 'ref', columnType: 'datetime'
    },
    updatedAt: {
      type: 'ref', columnType: 'datetime'
    }
  },

  beforeCreate: function(values, next){
    values.code = UtilsService.uid(16);
    next();
  }

};
