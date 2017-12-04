import React, { Component } from 'react';
import {Alert, Modal, Button, FormGroup, Form, FormControl} from 'react-bootstrap';
import {loginUrl} from '../../utils/urls'

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show,
            username: "",
            password: "",
            alertVisible: false,
        }

        this.close = this.close.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.setUsername = this.setUsername.bind(this)
    }

    login(username, password) {
        console.log(username)
        var payload = {
            username: username,
            password: password,
        }
        fetch(loginUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
        }).then(function(response) {
            if (response.ok)
                return response.json();
            return null;
        }).then(function(data) {
            if (data) {
                console.log(data)
                alert("Welcome " + data.username)
                // Save the user in localstorage
                localStorage.setItem("pizzaUser", data.username)
                this.close()
            }else {
                alert("Invalid Credentials")
            }
        });
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
                <div>
                <Modal show={this.state.show} autoFocus={true} onHide={this.close}>
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
                <Button onClick={() => this.login(this.state.username, this.state.password)}>
                Sign in
            </Button >
                </FormGroup>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
                </Modal>
                </div>
        )
    }
}

export default LoginModal;
