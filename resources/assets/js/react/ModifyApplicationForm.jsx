App.Views.ModifyApplicationForm = React.createClass({
    getInitialState: function() {
      return {
        id:             this.props.jobApp.id,
        company:        this.props.jobApp.company,
        listing_url:    this.props.jobApp.listing_url,
        phase:          this.props.jobApp.phase,
        location:       this.props.jobApp.location,
        expected_salary: this.props.jobApp.expected_salary,
        inside_contact_name: this.props.jobApp.inside_contact_name,
        inside_contact_email: this.props.jobApp.inside_contact_email,
        notes:          this.props.jobApp.notes,
        remote:         this.props.jobApp.remote
      }
    },
    handleCompanyChange: function(e) {
      this.setState({ company: e.target.value});
      this.props.updateCompanyName(e.target.value);
    },
    handleUrlChange: function(e) {
      this.setState({ listing_url: e.target.value});
      this.props.updateListingUrl( e.target.value );
    },   
    handlePhaseChange: function(e) {
      this.setState({ phase: e.target.value});
      this.props.updateItemColor( e.target.value );
    },   
    handleSalaryChange: function(e) {
      this.setState({ expected_salary: e.target.value});
    },    
    handleLocationChange: function(e) {
      this.setState({ location: e.target.value});
    },    
    handleContactNameChange: function(e) {
      this.setState({ inside_contact_name: e.target.value});
    },    
    handleContactEmailChange: function(e) {
      this.setState({ inside_contact_email: e.target.value});
    }, 
    handleNotesChange: function(e) {
      this.setState({ notes: e.target.value});
    },      
    handleRemoteChange: function(e) {
      this.setState({ remote: e.target.checked });
    },      
    handleSubmit: function(e) {
      e.preventDefault();
      var id = this.state.id;
      // Hide Modal after setting ID
      $('#modifyApplicationForm' + id).modal('hide');
      var company = this.state.company.trim();
      var listing_url = this.state.listing_url.trim();
      var phase = this.state.phase.trim();
      var expected_salary = this.state.expected_salary;
      var location = this.state.location.trim();
      var inside_contact_name = this.state.inside_contact_name.trim();
      var inside_contact_email = this.state.inside_contact_email.trim();
      var notes = this.state.notes.trim();
      if(this.state.remote){
        var remote = 1;
      } else {
        var remote = 0;
      }
      if (!company || !listing_url) {
        return;
      }
      this.props.callbackAppSubmit({
          company: company,
          listing_url: listing_url,
          phase: phase,
          expected_salary: expected_salary,
          location: location,
          inside_contact_name: inside_contact_name, 
          inside_contact_email: inside_contact_email,
          notes: notes,
          remote: remote
      }, id);
    },
    handleDelete: function(){
      var id = this.state.id;
      // Delete record
      this.props.handleDelete(id);
    },
    capitalizeCompany: function(companyName) {
      return companyName.charAt(0).toUpperCase() + companyName.slice(1);
    },
    generateTitle: function(companyName){
      if(companyName == ''){
        return 'New Company'
      } else {
        return this.capitalizeCompany(this.state.company);
      }
    },
    // closeModal: function(id){
    //   jQuery('#modifyApplicationForm' + id).on('click', function(){
    //      jQuery('#modifyApplicationForm' + id).hide();
    //      jQuery('.modal-backdrop').remove();
    //   });
    // },
    // hideModal: function(){
    //   $('.open').removeClass('modal-open');
    //   $('.modal-backdrop').hide();
    //   $('#modifyApplicationForm' + this.state.id).removeClass("in");
    //   $('#modifyApplicationForm' + this.state.id).css({ "display": "none", 'padding-left': "0px" });
    //   console.log(this.state.id);

    // },
    render: function() {
        return (
            <div 
            className="modal fade" 
            id={"modifyApplicationForm" + this.props.jobApp.id} 
            tabindex="-1" 
            role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    { this.generateTitle(this.state.company) }
                  </div>
                  <div className="modal-body">
                      <form className="commentForm" 
                      onSubmit={this.handleSubmit} >
                        <div className="form-group">
                        <label HtmlFor="company-input">Company *</label>
                       <input
                          className="form-control" 
                          type="text"
                          id="company-input"
                          placeholder="Adelie, LLC"
                          value={this.state.company}
                          onChange={this.handleCompanyChange }
                        />
                        </div>
                        <div className="form-group">
                        <label HtmlFor="phase-input">Phase *</label>
                        <select 
                        id="phase-input" 
                        className="form-control"
                        onChange={this.handlePhaseChange} value={this.state.phase} name="select">
                          <option value="saved">Saved</option> 
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offered">Offered</option>
                        </select>
                        </div>
                        <div className="form-group">
                        <label HtmlFor="notes-input">Notes</label>
                        <textarea
                          className="form-control" 
                          type="text"
                          id="notes"
                          placeholder="Notes?"
                          value={this.state.notes}
                          onChange={this.handleNotesChange }
                        ></textarea>
                        </div>

                        <a 
                        href={"#collapsedInfo" + this.props.jobApp.id} 
                        role="button" data-toggle="collapse" aria-expanded="false" 
                        aria-controls={"collapsedInfo" + this.props.jobApp.id}
                        className="btn__viewInfo btn btn-info-outline">Edit Details</a>

                        <div className="collapse" 
                        id={"collapsedInfo" + this.props.jobApp.id} 
                        >
                          <div className="well">
                            

                        <div className="form-group">
                        <label HtmlFor="listing-input">Job Listing URL *</label>
                       <input
                          className="form-control" 
                          type="text"
                          id="listing-input"
                          placeholder="http://jobs.com/listing/xxx"
                          value={this.state.listing_url}
                          onChange={this.handleUrlChange }
                        />
                        </div>
                        <div className="form-group">
                        <label HtmlFor="salary-input">Salary</label>
                       <input
                          className="form-control" 
                          type="text"
                          id="salary-input"
                          placeholder="60,000"
                          value={this.state.expected_salary}
                          onChange={this.handleSalaryChange }
                        />
                        </div>
                        <div className="form-group">
                        <label HtmlFor="location-input">Location</label>
                       <input
                          className="form-control" 
                          type="text"
                          placeholder="New York, NY"
                          value={this.state.location}
                          onChange={this.handleLocationChange }
                        />
                        </div>
                        <div className="form-group">
                        <label HtmlFor="contact-name-input">Internal Contact</label>
                       <input
                          className="form-control" 
                          type="text"
                          id="contact-name-input"
                          placeholder="Bob Jones"
                          value={this.state.inside_contact_name}
                          onChange={this.handleContactNameChange }
                        />
                        </div>
                        <div className="form-group">
                        <label HtmlFor="contact-email-input">Internal Contact Email</label>
                       <input
                          className="form-control" 
                          type="text"
                          id="contact-email-input"
                          placeholder="bjones@jobs.com"
                          value={this.state.inside_contact_email}
                          onChange={this.handleContactEmailChange }
                        />
                        </div>
                        <div className="form-group">
                        <label HtmlFor="remote">Remote</label>
                       <input
                          className="form-control" 
                          type="checkbox"
                          id="remote"
                          checked={ this.state.remote } 
                          onChange={this.handleRemoteChange }
                        />
                        </div>


                          </div>
                        </div>


                        <div className="form-group">
                        <input
                          className="btn btn-primary btn-lg form-control" 
                          type="submit" 
                          value="Update" />
                        </div>
                      </form>
                  </div>
                  <div className="modal-footer">
                    <button 
                    type="button" 
                    data-dismiss="modal"
                    style={{ float: 'left' }}
                    onClick={ this.handleDelete }
                    className="btn btn-danger">
                     Delete 
                    </button>
                    <button 
                    type="button" 
                    data-dismiss="modal"
                    className="btn btn-primary">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
    );
  }
});