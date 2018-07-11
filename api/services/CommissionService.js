module.exports = {
  searchCommission: async (userId, commissionId) => {
    if (!userId) { throw Error('No User Found'); }
    try {
      // get referral By Id
      if (commissionId) {
        sails.log('userId: ', userId);
        sails.log('commissionId: ', commissionId);
        let commission = await Commission.findOne({receiverId: userId, id: commissionId});
        sails.log('commission: ', commission);
        if (referral) {
          let trader = await User.findOne({
            where: {id: userId},
            select: ['email', 'first_name', 'last_name']
          });
          commission.trader = trader;
        }
        sails.log('commission: ', trader);
        return commission;
      // get all referral
      } else {
        let commissionResponse = [];
        let commissions = await Commission.find({receiverId: userId});
        for (i in commissions) {
          let commission = commissions[i];
          let trader = await User.findOne({
            where: {id: userId},
            select: ['email', 'first_name', 'last_name']
          });
          commission.trader = trader;
          commissionResponse.push(commission);
        }
        return commissionResponse;
      }
    } catch (err) {
      sails.log.error(err);
      throw err;
    }
  },
  add: async (userId, feePercentage, totalAmount, orderId, currencyId) => {
    try {
      // check referral
      let referral = await Referral.findOne({userId: userId});
      if (referral.referralCodeUsed) {
        console.log('referral: ', referral);
        let feeDiscountPercentage = 0.20;
        // calculate commission
        const discountedFee = await ReferralService.calculateDiscountedFee(feePercentage, feeDiscountPercentage, totalAmount);
        const commissionAmount = await ReferralService.calculateCommission(20, discountedFee);
        console.log('commissionAmount: ', commissionAmount);
        // update commission
        let referrer = await ReferralService.getReferrer(referral.id);
        console.log('referrer: ', referrer);
        let userBalance = await User_Balances.find({
          where: {currency: currencyId, site_user: referrer.user.id},
          select: ['balance', 'currency']
        }).limit(1);
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
  }
};

