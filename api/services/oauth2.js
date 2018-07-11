var oauth2orize = require('oauth2orize');
var  bcrypt = require('bcrypt');

// Create OAuth 2.0 server
var server = oauth2orize.createServer();

server.serializeClient((client, done) => {
  return done(null, client.id);
});

server.deserializeClient((id, done) => {
  Client.findOne(id, (err, client) => {
    if (err) { return done(err); }
    return done(null, client);
  });
});

// Generate authorization code
server.grant(oauth2orize.grant.code((client, redirectURI, user, ares, done) => {
  AuthCode.create({
    clientId: client.clientId,
    redirectURI: redirectURI,
    userId: user.id,
    scope: ares.scope
  }).exec((err,code) => {
    if(err){return done(err,null);}
    return done(null,code.code);
  });
}));

// Generate access token for Implicit flow
// Only access token is generated in this flow, no refresh token is issued
server.grant(oauth2orize.grant.token((client, user, ares, done) => {
  AccessToken.destroy({ userId: user.id, clientId: client.clientId }, (err) => {
    if (err){
      return done(err);
    } else {
      AccessToken.create({ userId: user.id, clientId: client.clientId }, (err, accessToken) => {
        if(err) {
          return done(err);
        } else {
          return done(null, accessToken.token);
        }
      });
    }
  });
}));

// Exchange authorization code for access token
server.exchange(oauth2orize.exchange.code((client, code, redirectURI, done) => {
  AuthCode.findOne({
    code: code
  }).exec((err,code) => {
    if(err || !code) {
      return done(err);
    }
    if (client.clientId !== code.clientId) {
      return done(null, false);
    }
    if (redirectURI !== code.redirectURI) {
      return done(null, false);
    }

    // Remove Refresh and Access tokens and create new ones
    RefreshToken.destroy({ userId: code.userId, clientId: code.clientId }).fetch().exec((err) => {
      if (err) {
        return done(err);
      } else {
        AccessToken.destroy({ userId: code.userId, clientId: code.clientId }).fetch().exec((err) => {
          if (err){
            return done(err);
          } else {
            RefreshToken.create({ userId: code.userId, clientId: code.clientId }).fetch().exec((err, refreshToken) => {
              if(err){
                return done(err);
              } else {
                AccessToken.create({ userId: code.userId, clientId: code.clientId }).fetch().exec((err, accessToken) => {
                  if(err) {
                    return done(err);
                  } else {
                    return done(null, accessToken.token, refreshToken.token, { 'expires_in': sails.config.oauth.tokenLife });
                  }
                });
              }
            });
          }
        });
      }
    });

  });
}));

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // var pwdCompare = bcrypt.compareSync(password, user.pass);
    // if(!pwdCompare){ return done( null, false); }

    // Remove Refresh and Access tokens and create new ones
    RefreshToken.destroy({ userId: user.id, clientId: client.clientId }).fetch().exec((err) => {
      if (err) {
        return done(err);
      } else {
        AccessToken.destroy({ userId: user.id, clientId: client.clientId }).fetch().exec((err) => {
          if (err){
            return done(err);
          } else {
            RefreshToken.create({ userId: user.id, clientId: client.clientId }).fetch().exec((err, refreshToken) => {
              if(err){
                return done(err);
              } else {
                AccessToken.create({ userId: user.id, clientId: client.clientId }).fetch().exec((err, accessToken) => {
                  if(err) {
                    return done(err);
                  } else {
                    // sails.log('server exchange: ', client, user, refreshToken, accessToken);
                    return done(null, accessToken.token, refreshToken.token, { 'expires_in': sails.config.oauth.tokenLife });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {

  RefreshToken.findOne({ token: refreshToken }).exec((err, token) => {

    if (err) { return done(err); }
    if (!token) { return done(null, false); }
    if (!token) { return done(null, false); }

    User.findOne({id: token.userId}).exec((err, user) => {

      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      // Remove Refresh and Access tokens and create new ones
      RefreshToken.destroy({ userId: user.id, clientId: client.clientId }).exec((err) => {
        if (err) {
          return done(err);
        } else {
          AccessToken.destroy({ userId: user.id, clientId: client.clientId }).exec((err) => {
            if (err){
              return done(err);
            } else {
              RefreshToken.create({ userId: user.id, clientId: client.clientId }).fetch().exec((err, refreshToken) => {
                if(err){
                  return done(err);
                } else {
                  AccessToken.create({ userId: user.id, clientId: client.clientId }).fetch().exec((err, accessToken) => {
                    if(err) {
                      return done(err);
                    } else {
                      return done(null, accessToken.token, refreshToken.token, { 'expires_in': sails.config.oauth.tokenLife });
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  });
}));

module.exports = server;
