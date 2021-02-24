import React, { Component } from "react";
import APost from './APost'

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorName: '',
            authorAvata: '',
            authorPost: '',
        }
    }

    componentDidMount() {
        let url = '/network/profile' + this.props.location.pathname
        $.ajax({
            type: "POST",
            url: url,
            success: ((data) => {
                this.setState(data)
                let a = JSON.parse(data.user)
                this.setState({
                    authorName: a[0].fields.username,
                    authorAvatar: a[0].fields.user_URL,
                    authorPost: data.data,
                })
                console.log(this.state)
            })
        })
    }

    render() {
        if (this.state.data) {
            return (
                <React.Fragment>
                    <ProfileHeader info={this.state} />
                    {this.state.data.map((d, index) => <APost data={d} key={index} />)}
                </React.Fragment>
            )
        }
        else { return <div>UserProfile</div> }

    }
}

function ProfileHeader(props) {
    console.log(props)
    return (
        <div className='profile-header'>
            <div className='profile-header-avatar'><img className='avatar' src={props.info.authorAvatar}></img></div>
            <div className='profile-header-name'>{props.info.authorName}</div>
        </div>
    )

}