import React, { Component } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import {Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { checkLoggedIn } from '../../utils/userTools';
import {getUserUrl } from '../../utils/urls';

var classestmp = new Array();
class User extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            username: username,
            loggedIn: username == null ? false : true,
            classes:[],
            classesQA: [],
            questionCt: 0
        };

        this.getclassess();
    }
    getclassess(){
        fetch(getUserUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ //add body 
              username: this.state.username,
              class: this.state.class,
              note: this.state.classnotes
          }),
        }).then(function(response) {
            return response.json();
        }).then((responseJson) => {
            console.log(responseJson);
            if (responseJson){
                var classcnt = 0;
                var notes = responseJson.notes;
                
                for(var i = 0; i < notes.length; i++){
                    var obj = notes[i];

                    if(classestmp.length == 0)
                    {
                        classestmp[classcnt] = obj.course_notes_name;
                        classcnt++;
                    }
                    else{
                        for(var j = 0; j < classcnt; j++){
                            if(obj.course_notes_name == classestmp[j])
                            {
                                break;
                            }
                            else if(j == classcnt-1){
                                classestmp[classcnt] = obj.course_notes_name;
                                classcnt++;
                                break;
                            }

                        }
                    }
                }

                console.log(classestmp);

                this.setState({
                    classes: classestmp,
                    questionCt: responseJson.questionCt,
                    classesQA: responseJson.classes,
                });
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
                    <Panel header={<h4>{this.state.username}'s classes with notes</h4>}>
                    <ListGroup>
                    {
                        this.state.classes.map(function(listValue){
                            return <ListGroupItem>{listValue}</ListGroupItem>
                        })
                    }
                    </ListGroup>
                    </Panel>
                    <Panel header={<h4>{this.state.username}'s classes enrolled for QA</h4>}>
                    <ListGroup>
                    {
                        this.state.classesQA.map(function(listValue){
                            return <ListGroupItem>{listValue}</ListGroupItem>
                        })
                    }
                    </ListGroup>
                    </Panel>
                    <Panel header={<h4>{this.state.username}'s stats</h4>}>
                    <ListGroup>
                    <ListGroupItem>Total Classes Enrolled for QA: {this.state.classesQA.length}</ListGroupItem>
                    <ListGroupItem>Total Classes with Notes: {this.state.classes.length}</ListGroupItem>
                    <ListGroupItem>Total Questions Asked: {this.state.questionCt}</ListGroupItem>
                    </ListGroup>
                    </Panel>
                    </div>
            );
        }
    }
}

export default User;
