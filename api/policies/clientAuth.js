/**
 * Client Auth Policy
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

var passport = require('passport');

module.exports = function (req, res, next) {
  return passport.authenticate(['basic', 'oauth2-client-password'], { session: false })(req, res, next);
};
