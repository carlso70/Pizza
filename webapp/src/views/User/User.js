import React, { Component } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import {Panel, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false,
            classes:['TEST CLASS1', 'TEST CLASS2']
        }
        this.checkLoggedIn()
    }

    checkLoggedIn() {

    }

    render() {
        if (!this.state.loggedIn) {
            return(
                    <div className="animated fadeIn">
                    <LoginModal style={{position: 'absolute', top:'50%', left:'50%', transfrom: 'translate(-50%, -50%)'}}
                show={!this.state.loggedIn}/>
                    </div>
            );
        }else {
            return (
                    <div className="animated fadeIn">
                    <Jumbotron>
                    <h4>Your Classes</h4>
                    <ListGroup>
                    { this.state.classes.map(function(listValue){
                        return <ListGroupItem>{listValue}</ListGroupItem>
                    })}
                    </ListGroup>
                    </Jumbotron>
                    <Panel header={<h4>User</h4>}>
                    Total Classes Enrolled
                    </Panel>
                    </div>
            );
        }
    }
}

export default User;
