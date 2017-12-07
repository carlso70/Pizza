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
import { getClass, createQuestionUrl } from '../../utils/urls';

class Classroom extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            username: username,
            loggedIn: username == null ? false : true,
            classTitle: this.props.classTitle,
            class: {},
            showQuestionModal: false,
            newQuestion: ""
        };

        this.handleNewQuestion = this.handleNewQuestion.bind(this);
        this.close = this.close.bind(this);
        this.postNewQuestion = this.postNewQuestion.bind(this);
        this.fetchClassData = this.fetchClassData.bind(this);
        this.fetchClassData();
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.classTitle = nextProps.classTitle
    }

    fetchClassData() {
        var payload = {
            title: this.state.classTitle
        }
        fetch(getClass, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data) {
                console.log(data)
                this.setState({ class : data});
            }
        });
    }

    postNewQuestion() {
        var payload = {
            class: this.props.classTitle,
            username: this.state.username,
            question: this.state.newQuestion,
        }
        console.log(JSON.stringify(payload));
        fetch(createQuestionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data) {
                console.log(data)
                this.setState({
                    class: data,
                    showQuestionModal: false
                });
            }
        });
    }

    handleNewQuestion(e) {
        this.setState({
            newQuestion: e.target.value
        });
    }

    close() {
        this.setState({
            showQuestionModal: false
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
                    {this.state.classTitle}
                    <Panel>
                    <Button bsStyle="primary" onClick={() => this.setState({showQuestionModal: true})}>Ask Question</Button>
                    </Panel>


                    <Modal show={this.state.showQuestionModal} onHide={this.close}>
                    <Modal.Header closeButton>
                    <Modal.Title>Ask Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                    <FormGroup>
                    <FormControl
               type="text"
               placeholder="New Question"
               value={this.state.newQuestion}
               onChange={this.handleNewQuestion}/>
                    </FormGroup>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => {this.postNewQuestion()}}>Post</Button>
                    <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                    </Modal>
                    </div>
            );
        }
    }
}

export default Classroom;
