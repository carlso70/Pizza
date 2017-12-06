import React, { Component } from 'react';
import {View, TextInput, StyleSheet, Image, AsyncStorage} from 'react-native'
import {Button} from 'react-native-elements';
//import ClassJumbotron from '../../components/ClassJumbotron/ClassJumbotron';
import LoginModal from '../../components/LoginModal/LoginModal';
import { checkLoggedIn } from '../../utils/userTools';

class NoteTaker extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            username: "",
            loggedIn: true,

        };
    }

    render() {
        if (!this.state.loggedIn) {
            return(
                    <div className="animated fadeIn" style={{padding: 60}}>
                    <LoginModal show={!this.state.loggedIn}/>
                    </div>
            );
        } else {
            return (
                    <div className="animated fadeIn">
                    <TextInput
                        placeholder='Begin taking notes here...'
                        style={{
                            marginLeft: '10%',
                            paddingBottom: 20,
                            marginTop: 20,
                            width: '60%',
                            height: '100%'
                        }}
                        />
                        
                    </div>
            );
        }
    }
}

export default Dashboard;