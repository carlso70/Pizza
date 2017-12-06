import React, { Component } from 'react';
import {Label, Alert, Modal, Button, FormGroup, Form, FormControl} from 'react-bootstrap';
import {loginUrl, createUserUrl } from '../../utils/urls'

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'true',
            validationState: null,
            username: "",
            password: "",
            alertVisible: false
        }

        this.close = this.close.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.login = this.login.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }

    createAccount(username, password) {
        console.log(username)
        var payload = {
            username: username,
            password: password,
        }
        fetch(createUserUrl, {
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
                localStorage.setItem("pizzaUser", data.username);
                location.reload();
            }
        });

        this.close();
    }

    login(username, password) {
        console.log(username)
        var payload = {
            username: username,
            password: password,
        }
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(function(response) {
            console.log(response)
            if (response.ok) {
                return response.json();
            } else {
                alert("Error");
                return null;
            }
        }).then(function(data) {
            if (data) {
                console.log(data);
                // Save the user in localstorage
                localStorage.setItem("pizzaUser", data.username);
                location.reload();
            }
        });

        this.close();
    }

    close() {
        this.setState({
            show: false
        });
    }

    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
                <div style={{padding: 15}}>
                <Modal.Dialog show={this.state.show}>
                <Modal.Header>
                <Modal.Title><Label>Log In / Create Account</Label></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form horizontal>
                <FormGroup bsSize="large">
                <FormControl
            type="text"
            label="Username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.setUsername}
                />
                <FormControl
            type="password"
            label="Password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.setPassword}
                />
                <Button style={{margin: 10}} onClick={() => this.login(this.state.username, this.state.password)}>
                Sign in
            </Button>
                <Button onClick={() => this.createAccount(this.state.username, this.state.password)}>
                Create Account
            </Button >
                </FormGroup>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={() => this.close()}>Close</Button>
                </Modal.Footer>
                </Modal.Dialog>
                </div>
        )
    }
}

export default LoginModal;
