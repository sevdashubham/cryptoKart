/**
 * Ensure Login Policy
 *
 * TODO api auth policy describe
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports = function (req, res, next) {
  return oauth2.authorize((clientId, redirectURI, done) => {
    Client.findOne({clientId: clientId}, (err, client) => {
      if (err) { return done(err); }
      if (!client) { return done(null, false); }
      if (client.redirectURI !== redirectURI) { return done(null, false); }
      return done(null, client, client.redirectURI);
    });
  })(req, res, next);
};
