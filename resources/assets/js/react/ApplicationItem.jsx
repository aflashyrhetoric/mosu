// ApplicationItem.jsx
// Handles toggling of modal
// Renders Application Item

import React from 'react';

export default class ApplicationItem extends React.component {

  constructor(props) {
    super(props);
    this.state = {
       company:     this.props.jobApp.company,
       listing_url: this.props.jobApp.listing_url,
       phase:       this.props.jobApp.phase  
    }
  }

  updateCompanyName(newCompanyName) {
    // let job_applications = this.state.data;
    this.setState({ company: newCompanyName });
  }

  updateListingUrl() {
    this.setState({ listing_url: newUrl });
  }

  showModal() {
    $('#modifyApplicationForm' + this.props.jobApp.id).modal('toggle');
  }

  updateItemColor(newPhase) {
    this.setState({ phase: newPhase})
  }

  render() {
    // Set snippet
    if(this.props.jobApp.notes.length == 0) {
      let snippet = String.fromCharCode('U+00A0');
    } else {
      let snippet = this.props.jobApp.notes.substring(0, 24) + " (...)";
    }
    return (
      <div className="application-item col-xs-12 col-sm-6 col-md-6 col-lg-4">
        <div
        className={"card card-block " + this.state.phase }>
            {/* Card Title: Company */}
          	<h4 className="card-title"> { this.state.company } </h4>
            <p className="card-text"> 
              { snippet } 
            </p>
            <a className="btn btn_viewListing btn-secondary" target="_blank" href={this.state.listing_url}> View Listing </a>
            <button type="button" onClick={this.showModal} className="btn btn-secondary">Manage</button>

            <App.Views.ModifyApplicationForm
              jobApp={this.props.jobApp}
              callbackAppSubmit={this.props.callbackAppSubmit}
              handleDelete={this.props.handleDelete}
              updateCompanyName={ this.updateCompanyName }
              updateListingUrl={ this.updateListingUrl }
              showModal={ this.showModal }
              updateItemColor={this.updateItemColor}
            />
        </div>
      </div>
    );
  }
};