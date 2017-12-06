import React, { Component } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import {Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { checkLoggedIn } from '../../utils/userTools';
import { getClasses } from '../../utils/urls';

class Classes extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            username: username,
            loggedIn: username == null ? false : true,
            classes:['TEST CLASS1', 'TEST CLASS2'],
            noteCt: 5,
            questionCt: 10
        };

        this.fetchUserClasses()
    }

    fetchUserClasses() {
        if (this.state.username == null) return;
        var payload = {
            username: this.state.username
        }
        fetch(getUserClasses, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(payload),
        }).then(function(response) {
            return response;
        }).then(function(data) {
            if (data) {
                console.log(data)
                // Save the user in localstorage
                location.reload();
            }
        });
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
                    <Panel header={<h4>{this.state.username}'s classes</h4>}>
                    <ListGroup>
                    {
                        this.state.classes.map(function(listValue){
                            return <ListGroupItem>{listValue}</ListGroupItem>
                        })
                    }
                    </ListGroup>
                    </Panel>
                    <Panel header={<h4>{this.state.username}'s stats</h4>}>
                    <ListGroup>
                    <ListGroupItem>Total Classes Enrolled: {this.state.classes.length}</ListGroupItem>
                    <ListGroupItem>Total Notes Saved: {this.state.noteCt}</ListGroupItem>
                    <ListGroupItem>Total Questions Asked: {this.state.questionCt}</ListGroupItem>
                    </ListGroup>
                    </Panel>
                    </div>
            );
        }
    }
}

export default Classes;
