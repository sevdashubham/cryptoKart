/**
 * AuthController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling auth requests.
 */

var passport = require('passport');

module.exports = {
  // // only API endpoint code.
  // login: function(req, res) {
  //   passport.authenticate('local', (err, user, info) => {
  //     if((err) || (!user)) {
  //       return res.send({
  //         message: 'Logged In',
  //         user
  //       });
  //     }
  //     req.logIn(user, (err) => {
  //       if(err) {res.send(err);}
  //       return res.send({
  //         message: 'Logged In',
  //         user
  //       });
  //     });
  //   })(req, res);
  // },
  // logout: function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // }

  // with frontend code.
  login: function(req,res){

    passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user))
      {
        res.redirect('/login');
        return;
      }

      // use passport to log in the user using a local method
      req.logIn(user, (err) => {
        if (err)
        {
          console.log(err)
          res.redirect('/login');
          return;
        }
        res.send({
          message: 'info.message',
          user
        });
        res.redirect('/');

        return;
      }
      );
    }
    )(req, res);
  },

  logout: function(req,res){
    req.logout();
    res.redirect('/');
  }

};
