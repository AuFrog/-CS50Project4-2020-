import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import APost from './APost'

export default class AllPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = ''
    }
  
    componentDidMount() {
      $.get('/network/allpost', (data) => {
        this.setState(data)
      })
    }
  
    render() {
       console.log(this.state.data )
      if (this.state.data) {
        return this.state.data.map((d, index) => <APost data={d} key={index} />)
      }
      else { return <div></div> }
    }
  }
  
  