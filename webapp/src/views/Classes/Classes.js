import React, { Component } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import {
    Panel,
    ListGroup,
    ListGroupItem,
    Button,
    ButtonGroup,
    Modal,
    Form,
    FormControl,
    FormGroup
} from 'react-bootstrap';
import { checkLoggedIn } from '../../utils/userTools';
import { getUserClasses, newClassUrl, getAllClassesUrl } from '../../utils/urls';

class Classes extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            username: username,
            loggedIn: username == null ? false : true,
            classes:[],
            allClasses: [],
            showAddClassModal: false,
            showLeaveClassModal: false,
            showJoinClassModal: false,
            newClassName: "",
            newClassDescription: ""
        };

        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleNewClassName = this.handleNewClassName.bind(this);
        this.close = this.close.bind(this);
        this.fetchUserClasses();
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
            return response.json();
        }).then(function(data) {
            if (data) {
                console.log(data)
            }
        });

    }

    postNewClass(title, description) {
        var payload = {
            title: title,
            description: description,
            student: this.state.username
        }
        fetch(newClassUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(payload),
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            if (data) {
                console.log(data)
            }
        });
    }

    close() {
        this.setState({
            showAddClassModal: false,
            showJoinClassModal: false,
            showLeaveClassModal: false
        });
    }

    handleDescChange(e) {
        this.setState({
            newClassDescription: e.target.value
        });
    }

    handleNewClassName(e) {
        this.setState({
            newClassName: e.target.value
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
                    <Panel>
                    <Button bsStyle="success" bsSize="large" onClick={() => this.setState({showAddClassModal:true})}block>Create Class</Button>
                    <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({showJoinClassModal:true})} block>Join Class</Button>
                    <Button bsStyle="danger" bsSize="large" onClick={() => this.setState({showLeaveClassModal:true})} block>Leave Class</Button>
                    </Panel>
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


                    <Modal show={this.state.showAddClassModal} onHide={this.close}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Class</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                    <FormGroup>
                    <FormControl
               type="text"
               placeholder="Class Name"
               value={this.state.newClassName}
               onChange={this.handleNewClassName}/>
                    </FormGroup>
                    <FormGroup>
                    <FormControl
                type="text"
                placeholder="Description"
                value={this.state.newClassDescription}
                onChange={this.handleDescChange}/>
                    </FormGroup>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => this.postNewClass(this.state.newClassName, this.state.newClassDescription)}>Add</Button>
                    <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showLeaveClassModal} onHide={this.close}>
                    <Modal.Header closeButton>
                    <Modal.Title>CLICK CLASS TO LEAVE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ListGroup>
                    {
                        this.state.classes.map(function(listValue){
                            return <ListGroupItem bsStyle="danger" onClick={() => alert("TEST" + listValue)}>{listValue}</ListGroupItem>
                        })
                    }
                    </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showJoinClassModal} onHide={this.close}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ListGroup>
                    {
                        this.state.allClasses.map(function(listValue){
                            return <ListGroupItem active>{listValue}</ListGroupItem>
                        })
                    }
                    </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                    </Modal>


                </div>
            );
        }
    }
}

export default Classes;
