import React, { Component } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import {
    Panel,
    ListGroup,
    ListGroupItem,
    InputGroup,
    Button,
    ButtonGroup,
    Jumbotron,
    Modal,
    Form,
    FormControl,
    FormGroup
} from 'react-bootstrap';
import { checkLoggedIn } from '../../utils/userTools';
import { getClass, createQuestionUrl, answerQuestionUrl } from '../../utils/urls';

class Classroom extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            username: username,
            loggedIn: username == null ? false : true,
            classTitle: this.props.classTitle,
            class: {questions:[]},
            showQuestionModal: false,
            showAnswerModal: false,
            questionAnswering: "",
            newQuestion: "",
            newAnswer: ""
        };

        this.handleNewQuestion = this.handleNewQuestion.bind(this);
        this.handleNewAnswer = this.handleNewAnswer.bind(this);
        this.close = this.close.bind(this);
        this.postNewQuestion = this.postNewQuestion.bind(this);
        this.answerQuestion = this.answerQuestion.bind(this);
        this.fetchClassData = this.fetchClassData.bind(this);
        this.fetchClassData(this.props.title);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.classTitle != nextProps.classTitle) {
            nextState.classTitle = nextProps.classTitle;
            this.fetchClassData(nextProps.classTitle);
        }
    }


    fetchClassData(title) {
        var payload = {
            title: title == null ? this.state.classTitle : title
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
                if (data.questions == null) {
                    data.questions = [];
                    this.setState({class : data});
                } else {
                    this.setState({class : data});
                }
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
                if (data.questions == null) {
                    data.questions = [];
                    this.setState({
                        class : data,
                        showQuestionModal: false
                    });
                } else {
                    this.setState({
                        class : data,
                        showQuestionModal: false
                    });
                }
            }
        });
    }

    postNewAnswer() {
        var payload = {
            class: this.state.classTitle,
            username: this.state.username,
            question: this.state.newQuestion,
            answer: this.state.newAnswer
        }
        console.log(JSON.stringify(payload));
        fetch(answerQuestionUrl, {
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
                if (data.questions == null) {
                    data.questions = [];
                    this.setState({
                        class : data,
                        showQuestionModal: false
                    });
                } else {
                    this.setState({
                        class : data,
                        showQuestionModal: false
                    });
                }
            }
        });
    }



    handleNewQuestion(e) {
        this.setState({
            newQuestion: e.target.value
        });
    }

    handleNewAnswer(e) {
        this.setState({
            newAnswer: e.target.value
        });
    }

    answerQuestion(question) {
        this.setState({
            showAnswerModal: true,
            newQuestion: question
        });
    }

    close() {
        this.setState({
            showQuestionModal: false,
            showAnswerModal: false
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
                    <h4>{this.state.classTitle}</h4>
                    <Button bsStyle="primary" onClick={() => this.setState({showQuestionModal: true})}>Ask Question</Button>
                    </Panel>
                    <ListGroup id="ref">
                    {
                        this.state.class.questions.map((listValue) => {
                            return <div>
                                <Jumbotron>
                                <h1>{listValue.question}</h1>
                                <ListGroup>
                                {
                                    listValue.answers.map((answer) => {
                                        return <ListGroupItem>{answer}</ListGroupItem>
                                    })
                                }
                                </ListGroup>
                                <Button onClick={() => this.answerQuestion(listValue.question)}>Answer Question</Button>
                                </Jumbotron>
                                </div>
                        })
                    }
                </ListGroup>

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

                    <Modal show={this.state.showAnswerModal} onHide={this.close}>
                    <Modal.Header closeButton>
                    <Modal.Title>Answering Question: {this.state.newQuestion}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                    <FormGroup>
                    <FormControl
               type="text"
               placeholder="Response"
               value={this.state.newAnswer}
               onChange={this.handleNewAnswer}/>
                    </FormGroup>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => this.postNewAnswer()}>Post</Button>
                    <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                    </Modal>
                    </div>
            );
        }
    }
}

export default Classroom;
