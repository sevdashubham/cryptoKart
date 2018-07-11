/**
 * Ensure Login Policy
 *
 * TODO api auth policy describe
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
let login = require('connect-ensure-login');
var passport = require('passport');

module.exports = function (req, res, next) {
  // return login.ensureLoggedIn();
  return passport.authenticate(['basic','bearer'], { session: false })(req, res, next);
};