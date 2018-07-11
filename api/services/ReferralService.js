module.exports = {

  searchReferral: async (userId, referralId) => {
    if (!userId) { throw Error('No User Found'); }
    try {
      // get referral By Id
      if (referralId) {
        sails.log('userId: ', userId);
        sails.log('referralId: ', referralId);
        let referral = await Referral.findOne({id: referralId, userId: userId});
        sails.log('referral: ', referral);
        if (referral) {
          let referees = await module.exports.getReferees(referralId);
          let referer = await module.exports.getReferrer(referralId);
          referral.referees = referees;
          referral.referer = referer;
        }
        sails.log('referral: ', referral);
        return referral;
      // get all referral
      } else {
        let referralsResponse = [];
        let referrals = await Referral.find({userId: userId});
        for (i in referrals) {
          let referral = referrals[i];
          let referees = await module.exports.getReferees(referral.id);
          let referer = await module.exports.getReferrer(referral.id);
          referral.referees = referees;
          referral.referer = referer;
          referralsResponse.push(referral);
        }
        return referralsResponse;
      }
    } catch (err) {
      sails.log.error(err);
      throw err;
    }
  },

  add: async (userId, referralCodeUsed) => {
    if (!userId) { throw Error('No User Found'); }
    try {
      let referral = await Referral.create({userId: userId, referralCode: 'auto', referralCodeUsed: referralCodeUsed}).fetch();
      return referral;
    } catch (err) {
      throw err;
    }
  },

  update: async (userId, referralId, referralCode, referralCodeUsed) => {
    if (!userId) { throw Error('No User Found'); }
    let refId = referralId;
    try {
      let referral;
      if (refId) {
        referral = await Referral.update({id: referralId, userId: userId}).set({referralCode: referralCode, referralCodeUsed: referralCodeUsed}).fetch();
      } else {
        referral = await Referral.update({userId: userId}).set({referralCode: referralCode, referralCodeUsed: referralCodeUsed}).fetch();
      }
      console.log(referral);
      return referral;
    } catch (err) {
      throw err;
    }
  },

  remove: async (userId, referralId) => {
    if (!userId) { throw Error('No User Found'); }
    try {
      let referral = await Referral.destroy({id: referralId, userId: userId}).fetch();
      return referral;
    } catch (err) {
      throw err;
    }
  },

  // get referees
  getReferees: async (referralId) => {
    console.log('get referees: ', referralId);
    try {
      let referral = await Referral.find({id: referralId});
      let referees = await Referral.find({referralCodeUsed: referral[0].referralCode});
      // fetch user info
      if (referees.length > 0) {
        for (i in referees) {
          const user = await User.findOne({id: referees[i].userId});
          delete user.pass;
          delete referees[i].userId;
          referees[i].user = user;
        }
      }
      return referees;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  // get referer
  getReferrer: async (referralId) => {
    try {
      let referral = await Referral.findOne({id: referralId});
      let referrer = await Referral.findOne({referralCode: referral.referralCodeUsed});
      if (referrer) {
        const user = await User.findOne({id: referrer.userId});
        delete referrer.userId;
        delete user.pass;
        referrer.user = user;
        return referrer;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getDiscount: async (userId, totalAmount) => {
    try {
      // check referral
      let referral = await Referral.findOne({userId: userId});
      let feePercentage = 0.25;
      console.log('referralCodeUsed: ', referral.referralCodeUsed);
      let discountedFee;
      if (referral.referralCodeUsed) {
        // calculate discount
        let feeDiscountPercentage = 0.20;
        discountedFee = await module.exports.calculateDiscountedFee(feePercentage, feeDiscountPercentage, totalAmount);
        console.log('discountedFee: ', discountedFee);
        return {
          discountPercentage: feeDiscountPercentage,
          amount: discountedFee
        };
      } else {
        let feeDiscountPercentage = 0.0;
        // trading discount not applicable: return tradingFee;
        discountedFee = await module.exports.calculateFee(feePercentage, totalAmount);
        return {
          discountPercentage: feeDiscountPercentage,
          amount: discountedFee
        };
      }
    // return discount and percentage
    } catch(err) {
      throw err;
    }
  },

  executeCommission: async (userId, feePercentage, totalAmount, orderId, currencyId) => {
    try {
      // check referral
      let referral = await Referral.findOne({userId: userId});
      if (referral.referralCodeUsed) {
        console.log('referral: ', referral);
        let feeDiscountPercentage = 0.20;
        // calculate commission
        const discountedFee = await module.exports.calculateDiscountedFee(feePercentage, feeDiscountPercentage, totalAmount);
        const commissionAmount = await module.exports.calculateCommission(20, discountedFee);
        console.log('commissionAmount: ', commissionAmount);
        // update commission
        let referrer = await module.exports.getReferrer(referral.id);
        console.log('referrer: ', referrer);
        let userBalance = await User_Balances.find({
          where: {site_user: referrer.user.id, currency: currencyId},
          select: ['balance']
        });
        if (userBalance[0]) {
          console.log('userBalance:', userBalance);
          let updatedBalance = userBalance[0].balance + commissionAmount;
          let updatedUserBalance = await User_Balances.update({site_user: referrer.user.id, currency: currencyId}).set({balance: updatedBalance}).fetch();
          let commission = await Commission.create({
            receiverId: referrer.user.id,
            traderId: userId,
            orderId: orderId,
            currencyId: currencyId,
            totalOrderAmount: totalAmount,
            commissionAmount: commissionAmount
          }).fetch();
          console.log('commission: ', commission);
          return commission;
        } else {
          throw Error('Failed To Update User Balance');
        }
      } else {
        return [];
      }
    } catch (err) {
      sails.log('Error: ', err);
      throw err;
    }
  },

  // Helper Function: Calculate Trading Fee.
  calculateFee: async (feePercentage, totalAmount) => {
    try {
      const result = ( feePercentage / 100 ) * totalAmount;
      return result;
    } catch (err) {
      throw err;
    }
  },

  // Helper Function: Calculate Discounted Trading Fee.
  calculateDiscountedFee: async (feePercentage, feeDiscountPercentage, totalAmount) => {
    try {
      const result1 = (1 - feeDiscountPercentage) / 100;
      console.log('result1: ', result1);
      const result2 = feePercentage * result1;
      console.log('result2: ', result2);
      const result = (result2 * totalAmount).toFixed(2);
      console.log('result: ', result);
      return result.toLocaleString();
    } catch (err) {
      throw err;
    }
  },

  // Helper Function: Calculate Commission on Trading Fee.
  calculateCommission: async (commissionPercentage, discountedFee) => {
    try {
      const commission = (commissionPercentage / 100) * discountedFee;
      return commission;
    } catch (err) {
      throw err;
    }
  }
};

