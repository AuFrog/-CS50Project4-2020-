import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
  useHistory,
  withRouter,
} from "react-router-dom";


import FunctionBar from "./FunctionBar";

export default class APost extends Component {
  constructor(props) {
    super(props)
  }

  handleClick(){
    let url='/network/' + this.props.data[0];

    // cannot use hook in class component
    // let history=useHistory()
    // history.push(pushUrl);

    window.location.href=url;

  }

  render() {
    return (
      <div className='a-post'>
        <div className='post-info'>

          {/* when wrap custom component with <Link>, add 'passHref' in the Link tag
          <Link  to={url} passHref ><Avatar avatarUrl={this.props.data[4] }/></Link>  */}

          <Avatar avatarUrl={this.props.data[4]}  customClickEvent={this.handleClick.bind(this)}/>

          <div className='post-name-text'>
            <div className='post-author' onClick={() => this.handleClick()}><a href='#'>{this.props.data[1]}</a></div>
            <Stamp stamp={this.props.data[2].replace("T", " ").replace('Z', '')} />
            <div className='post-text'>{this.props.data[3]}</div>
          </div>
        </div>
        <FunctionBar id={this.props.data[0]} />
      </div>


    )
  }
}

//Compare class component and function component
// class Avatar extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className='post-user-avatar'>
//         <a href='#'><img src={this.props.avatarUrl}></img></a>
//       </div>
//     )
//   }
// }
function Avatar(props) {
  return (
    <div className='post-author-avatar' onClick={props.customClickEvent}>
      <a href='#'><img className='avatar' src={props.avatarUrl}></img></a>
    </div>
  )
   
}

function Stamp(props) {
  return (
    <div className='post-stamp'>{props.stamp}</div>
  )
}
