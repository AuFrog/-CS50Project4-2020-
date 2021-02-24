import React, { Component } from "react";


export default function FunctionBar(props) {
    // console.log('function bar, props:', props)
    return (
      <div className='function-bar'>
        <ul className='clearfix'>
          <LikeButton id={props.id} />
          <li>
            <a href='#'>
              <span className='function-li'>
                <span>c</span><span>comment</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
  
  
  class LikeButton extends Component {
    constructor(props) {
      // console.log('likebutton')
      super(props)
      this.state = {
        like: false,
        color: '',
      }
    }
    componentDidMount() {
      // console.log('likeB did update')
      $.ajax({
        type: 'POST',
        url: '/network/like',
        data: {
          'pid': this.props.id,
          'ini': true
        },
        success:((data)=>{
          // console.log(data)
          this.setState({
            like:data.result
          })
        })
        //Or bind(this) of success
        // success: function (data) {
        //   console.log(data.result)
        //   this.setState({
        //     like: data.result
        //   })
        // }.bind(this)
      })
    }
  
    handleClikck() {
      // console.log(this.props)
      $.ajaxSetup({ headers: { "X-CSRFToken": '{{csrf_token}}' } });
      $.ajax({
        type: 'POST',
        url: '/like',
        data: {
          'pid': this.props.id,
          'ini': false
        }
      })
      this.setState({
        like: !this.state.like
      })
    }
    render() {
      // console.log('like render')
      return (
        <li>
          <a href='#' >
            <span className='function-li' onClick={() => this.handleClikck()}>
              <span className='f-icon'></span>{this.state.id}<span>{this.state.like ? 'cancel' : 'like'}</span>
            </span>
          </a>
        </li>
      )
    }
  }
  