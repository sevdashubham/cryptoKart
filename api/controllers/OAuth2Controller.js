/**
 * AuthController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling auth requests.
 */


module.exports = {

  authorize: (req, res, next) => {

    // TRUSTED CLIENT
    // if client is trusted, skip ahead to next,
    // which is the server.decision() function
    // that normally is called when you post the auth dialog form
    if (req.oauth2.client.trusted) {

      // add needed params to simulate auth dialog being posted
      req.trusted = true;
      req.body = req.query;
      req.body.transaction_id = req.oauth2.transactionID;
      return next();

    }

    // return res.send({
    //   transactionID: req.oauth2.transactionID,
    //   user: req.user,
    //   client: req.oauth2.client,
    //   jwtToken: req.query.token
    // });

    return res.render('pages/dialog', {
      transactionID: req.oauth2.transactionID,
      user: req.user,
      client: req.oauth2.client,
      jwtToken: req.query.token
    });

  },
  // We added this 2 methods here in case the form is skipped (TRUSTED CLIENT)
  // server.decision(),
  // server.errorHandler();
  decision: oauth2.decision(),
  token: function(req, res){
    res.json({});
  }
};
