/**
 * CommissionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  searchCommission: async (req, res) => {
    const userId = req.params.userId;
    const commissionId = req.params.commissionId;
    const user = req.user;
    try {
      let result;
      //check if user parameter is passed in url & if user is admin here
      if (userId) {
        if (commissionId) {
          result = await CommissionService.searchCommission(userId, commissionId);
        } else {
          result = await CommissionService.searchCommission(userId, null);
        }
        //restrict user from accessing all referrals
      } else if (user) {
        if (commissionId) {
          sails.log('userreferralid');
          result = await CommissionService.searchCommission(user.id, commissionId);
        } else {
          result = await CommissionService.searchCommission(user.id, null);
        }
      } else {
        if (commissionId) {
          result = await CommissionService.searchCommission(null, commissionId);
        } else {
          result = await CommissionService.searchCommission(null);
        }
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.serverError(err);
    }
  },

  add: async (req, res) => {
    const userId = req.params.userId;
    const user = req.user;
    const totalTradeAmount = req.body.totalTradeAmount;
    const orderId = req.body.orderId;
    const currencyId = req.body.currencyId;
    try {
      let result;
      // check admin
      if (userId) {
        result = await CommissionService.add(userId, 0.25, totalTradeAmount, orderId,currencyId);
        //restrict user from creating other users referrals
      } else if (user) {
        result = await CommissionService.add(user.id, 0.25, totalTradeAmount, orderId,currencyId);
      }
      res.json(result);
    } catch (err) {
      res.serverError(err);
    }
  },


  // update: async (req, res) => {
  //   const userId = req.params.userId;
  //   const referralId = req.params.referralId;
  //   const referralCode = req.body.referralCode;
  //   const referralCodeUsed = req.body.referralCodeUsed;
  //   const user = req.user;
  //   try {
  //     let result;
  //     if (userId) {
  //       sails.log('updating referral');
  //       result = await CommissionService.update(userId, referralId, referralCode, referralCodeUsed);
  //       //restrict user from accessing other users referrals
  //     } else if (user) {
  //       sails.log('updating referral by token user');
  //       result = await CommissionService.update(user.id, null, referralCode, referralCodeUsed);
  //     }
  //     res.json(result);
  //   } catch (err) {
  //     console.log(err);
  //     res.serverError(err);
  //   }
  // },


  // remove: async (req, res) => {
  //   const referralId = req.params.referralId;
  //   const userId = req.params.userId;
  //   const user = req.user;
  //   try {
  //     let result;
  //     if (userId) {
  //       result = await CommissionService.remove(userId, referralId);
  //       //restrict user from accessing other users referrals
  //     } else if (user) {
  //       result = await CommissionService.remove(user.id, referralId);
  //     }
  //     res.json(result);
  //   } catch (err) {
  //     res.serverError(err);
  //   }
  // },

};

