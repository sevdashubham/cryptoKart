/**
 * RefreshToken
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'oauth_refresh_token',
  attributes: {
    userId: {
      type: 'number',
      required: true
    },
    clientId: {
      type: 'string',
      required: true
    },
    token: {
      type: 'string',
    },
    createdAt: {
      type: 'ref', columnType: 'datetime'
    },
    updatedAt: {
      type: 'ref', columnType: 'datetime'
    }
  },

  beforeCreate: function(values, next){
    values.token = UtilsService.uid(255);
    next();
  }

};
