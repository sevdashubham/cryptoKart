import React from 'react';

const Kyc = () => (
  <div>
    <div className="content-over-layout">
      <header className="header px-3 py-2"><h3>KYC</h3></header>
      <div className="wrapper mx-3">
        <article className="content-container">
          <h3>Personal details</h3>
          <h5>First Name</h5>
          <h5>Last Name</h5>
          <h5>Country</h5>
          <h5>Sex</h5>
          <h5>ID Type</h5>
          <h5>Passport/ID Number</h5>
        </article>
        <article className="content-container">
          <h5>ID Image</h5>
<h5>Please submit in JPG format. The photo should be bright and clear, and all corners of the document should be visible. </h5>
        </article>
        <div>
          <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
        </div>
        <aside className="aside aside-1">
         <button className="btn btn-info">Submit</button>
        </aside>
        <aside className="aside aside-2">
          <button className="btn btn-info">Save</button>
        </aside>
      </div>
    </div>
  </div>
);

export default Kyc;
