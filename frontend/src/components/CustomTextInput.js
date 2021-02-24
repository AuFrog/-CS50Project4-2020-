import React, { Component } from "react";

export default class CustomTextInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(e) {
      this.setState({ value: e.target.value });
    }
  
    handleSubmit() {
      // $.ajaxSetup({ headers: { "X-CSRFToken": '{{csrf_token}}' } });
      $.ajax({
        type: 'POST',
        url: '/network/posts',
        data: {
          'c': this.state.value
        }
      })
  
    }
  
    render() {
      return (
        <div className='new-post'>
          <div className='new-post-title'>Share news</div>
          <div className='new-post-input'>
            <textarea type="text" value={this.state.value} onChange={this.handleChange} />
          </div>
          <div className='new-post-functionbar'>
            <input type="button" value="Sumbit" onClick={this.handleSubmit} />
          </div>
        </div>
      );
    }
  }
  
  