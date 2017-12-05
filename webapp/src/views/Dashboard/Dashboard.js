import React, { Component } from 'react';
import ClassJumbotron from '../../components/ClassJumbotron/ClassJumbotron';
import LoginModal from '../../components/LoginModal/LoginModal';
import { checkLoggedIn } from '../../utils/userTools';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            loggedIn: username == null ? false : true,
            classes: {}
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
                    <ClassJumbotron name="CS252"
                description="This is a simple class description, this class is ight"
                onPress={() => alert("Define an on press")}
                    />
                    <ClassJumbotron
                name="CS307"
                description="This course is about being a waste of time"
                onPress={() => alert("Dummy Button on press")}
                    />
                    </div>
            );
        }
    }
}

export default Dashboard;
