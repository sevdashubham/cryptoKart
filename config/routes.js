/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },
  'get /login': {
    view: 'pages/login'
  },
  'get /logout': {
    controller: 'Auth',
    action: 'logout'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  'POST /login': 'AuthController.login',
  'GET /logout': 'AuthController.logout',
  'POST /oauth/token': 'OAuth2Controller.token',
  'GET /oauth/authorize': 'OAuth2Controller.authorize',
  'POST /oauth/authorize': 'OAuth2Controller.decision',

  // User Referral Endpoints
  'GET /user/:userId/referral/': 'ReferralController.searchReferral',
  'GET /user/:userId/referral/:referralId': 'ReferralController.searchReferral',
  'POST /user/:userId/referral/': 'ReferralController.add',
  'PUT /user/:userId/referral/': 'ReferralController.update',
  'PUT /user/:userId/referral/:referralId': 'ReferralController.update',
  'DELETE /user/:userId/referral/': 'ReferralController.remove',
  'DELETE /user/:userId/referral/:referralId': 'ReferralController.remove',
  // Referral Endpoints
  'GET /referral/': 'ReferralController.searchReferral',
  'GET /referral/:referralId': 'ReferralController.searchReferral',
  'POST /referral': 'ReferralController.add',
  'PUT /referral': 'ReferralController.update',
  'PUT /referral/:referralId': 'ReferralController.update',
  'DELETE /referral': 'ReferralController.remove',
  'DELETE /referral/:referralId': 'ReferralController.remove',
  // Referral Discount
  'POST /referral/discount': 'ReferralController.discount',

  // Commission Endpoints
  'GET /commission': 'CommissionController.searchCommission',
  'POST /commission': 'CommissionController.add',
  'PUT /commission': 'CommissionController.update',
  'DELETE /commission': 'CommissionController.remove',

  'GET /api/info': 'InfoController.index'


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
