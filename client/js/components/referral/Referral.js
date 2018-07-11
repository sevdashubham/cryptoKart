import React, {Component} from 'react';
import axios from 'axios';
import './Referral.scss';
import Button from '@material-ui/core/Button';
import Moment from 'moment';

class Referral extends Component {
  state = {
    referralCode: '',
    copySuccess: '',
    referees: [], commissionList: []
  };
  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.blur();
    this.setState({copySuccess: 'Copied!'});
    console.log(this.state.copySuccess);
  };

  componentDidMount() {
    this.getReferral();
  }

  getReferral() {
    return axios.get('referral/')
      .then((res) => {
        this.setState({referralCode: res.data[0].referer.referralCode, referees: res.data[0].referees});
        console.log(res.data[0].referer.referralCode);
        console.log(res.data[0].referees);
        this.getCommissionList();
      })
      // .then(function (response) {
      //   console.log(response);
      //   this.setState({referralCode: response.data.referralCode})
      // })
      .catch(function (error) {
        console.log(error);
      });
  }

  getCommissionList() {
    return axios.get('commission/')
      .then((res) => {
        this.setState({commissionList: res.data});
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const referralCode = this.state.referralCode;
    const referees = this.state.referees.map(function (item) {
      return (
        <div className="list-referees">
          <div className="referral-list-title-email">
            <h5>{item.user.email}</h5>
          </div>
          <div className="referral-list-title-date">
            <h5>{Moment(item.updatedAt).locale('in').format('LL')}</h5>
          </div>
        </div>
      );
    });
    const commissionList = this.state.commissionList.map(function (item) {
      return (
        <div className="list-referees">
          <div className="referral-list-title-commission">
            <h5>{new Intl.NumberFormat('en-IN', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4
            }).format(item.commissionAmount)}</h5>
          </div>
          <div className="referral-list-title-email">
            <h5>{item.trader.email}</h5>
          </div>
          <div className="referral-list-title-date">
            <h5>{Moment(item.updatedAt).locale('in').format('LL')}</h5>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="content-over-layout">
          <header className="header px-3 py-2"><h3>Referral</h3></header>
          <div className="wrapper mx-3">
            <article className="content-container">
              <h5>Give 20%, get 20%</h5>
              <h5>They: Get 20% discount on trading fees (for 4 months)</h5>
              <h5>You: Gets 20% of fees from all trades of your referrals</h5>
            </article>
            <article className="content-container">
              <h5>Share you referral link</h5>
              <div className="input-bar">
                <div className="input-bar-item width100">
                  <form>
                    <div className="input-group">
                       <textarea className="width100"
                                 ref={(textarea) => this.textArea = textarea}
                                 value={referralCode}
                       />
                      {/*<input className="form-control width100" value={referralCode}/>*/}
                      <span className="input-group-btn">
                  <Button variant="contained" color="primary" onClick={this.copyToClipboard}>Copy</Button>
                </span>
                    </div>
                  </form>
                </div>
              </div>
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-linkedin-in"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-whatsapp"></i>
            </article>

            <aside className="aside aside-1">
              <h5>Refferal Friends</h5>
              <h5>{referees.length}</h5>
              <div className="referral-list mt-1">
                <div className="referral-list-title-email">
                  <h5>Email</h5>
                </div>
                <div className="referral-list-title-date">
                  <h5>Date</h5>
                </div>
              </div>
              <div>
                {referees}
              </div>
            </aside>
            <aside className="aside aside-2">
              <h5>Commission Value</h5>
              <h5>0 BTC</h5>
              <div className="referral-list mt-1">
                <div className="referral-list-title-commission">
                  <h5>Commission</h5>
                </div>
                <div className="referral-list-title-email">
                  <h5>Email</h5>
                </div>
                <div className="referral-list-title-date">
                  <h5>Date</h5>
                </div>
              </div>
              <div>
                {commissionList}
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default Referral;
