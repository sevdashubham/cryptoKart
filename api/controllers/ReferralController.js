/**
 * ReferralController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  searchReferral: async (req, res) => {
    const userId = req.params.userId;
    const referralId = req.params.referralId;
    const user = req.user;
    try {
      let result;
      //check if user parameter is passed in url & if user is admin here
      if (userId) {
        if (referralId) {
          result = await ReferralService.searchReferral(userId, referralId);
        } else {
          result = await ReferralService.searchReferral(userId, null);
        }
        //restrict user from accessing all referrals
      } else if (user) {
        if (referralId) {
          sails.log('userreferralid');
          result = await ReferralService.searchReferral(user.id, referralId);
        } else {
          result = await ReferralService.searchReferral(user.id, null);
        }
      } else {
        if (referralId) {
          result = await ReferralService.searchReferral(null, referralId);
        } else {
          result = await ReferralService.searchReferral(null);
        }
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.serverError(err);
    }
  },

  add: async (req, res) => {
    const referralCodeUsed = req.body.referralCodeUsed || '';
    const userId = req.params.userId;
    const user = req.user;
    try {
      let result;
      // check admin
      if (userId) {
        result = await ReferralService.add(userId, referralCodeUsed);
        //restrict user from creating other users referrals
      } else if (user) {
        result = await ReferralService.add(user.id, referralCodeUsed);
      }
      res.json(result);
    } catch (err) {
      res.serverError(err);
    }
  },


  update: async (req, res) => {
    const userId = req.params.userId;
    const referralId = req.params.referralId;
    const referralCode = req.body.referralCode;
    const referralCodeUsed = req.body.referralCodeUsed;
    const user = req.user;
    try {
      let result;
      if (userId) {
        sails.log('updating referral');
        result = await ReferralService.update(userId, referralId, referralCode, referralCodeUsed);
        //restrict user from accessing other users referrals
      } else if (user) {
        sails.log('updating referral by token user');
        result = await ReferralService.update(user.id, null, referralCode, referralCodeUsed);
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.serverError(err);
    }
  },


  remove: async (req, res) => {
    const referralId = req.params.referralId;
    const userId = req.params.userId;
    const user = req.user;
    try {
      let result;
      if (userId) {
        result = await ReferralService.remove(userId, referralId);
        //restrict user from accessing other users referrals
      } else if (user) {
        result = await ReferralService.remove(user.id, referralId);
      }
      res.json(result);
    } catch (err) {
      res.serverError(err);
    }
  },

  discount: async (req, res) => {
    const userId = req.params.userId;
    const user = req.user;
    const totalTradeAmount = req.body.totalTradeAmount;
    try {
      let result;
      if (userId) {
        result = await ReferralService.getDiscount(userId, totalTradeAmount);
      } else if (user) {
        result = await ReferralService.getDiscount(user.id, totalTradeAmount);
      }
      res.json({
        totalTradeAmount: totalTradeAmount,
        discountPercentageOnFee: 20,
        Fee: result
      });
    } catch (err) {
      res.serverError(err);
    }
  },

  commission: async (req, res) => {
    console.log('getting commission: ');
    const userId = req.params.userId;
    const user = req.user;
    const totalTradeAmount = req.body.totalTradeAmount;
    const orderId = req.body.orderId;
    const currencyId = req.body.currencyId;
    try {
      let result;
      if (userId) {
        result = await ReferralService.executeCommission(userId, 0.25, totalTradeAmount, orderId,currencyId);
        res.json(result);
      } else if (user) {
        result = await ReferralService.executeCommission(user.id, 0.25, totalTradeAmount, orderId, currencyId);
        res.json(result);
      } else {
        res.json(result);
      }
    } catch (err) {
      console.log(err);
      res.serverError(err);
    }
  }
};
