import React, { Component } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false
        }
        this.checkLoggedIn()
    }

    checkLoggedIn() {
        var username = localStorage.getItem('pizzaUser')
        if (username) {
            this.setState({
                username: username,
                loggedIn: true
            });
        }
    }

    render() {
        return (
                <div className="animated fadeIn">
                <LoginModal show={!this.state.loggedIn}/>
                </div>
        )
    }
}

export default User;
