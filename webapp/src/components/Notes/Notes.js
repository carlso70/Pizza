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
            classnotes: ""
            
        }
    }
    handleChange(e) {
        this.setState({ classnotes: e.target.value});
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 0) return 'success';
        else if (length == 0) return 'warning';
        return null;
      }

    render() {
        return (
            <div>
                <Form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        
        >
          <ControlLabel>Take Notes For Your Class</ControlLabel>
          <FormControl
            type="text"
            value={this.state.classnotes}
            placeholder="Begin entering your notes..."
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Take notes for your current class here!</HelpBlock>
        </FormGroup>
      </Form>
                </div>
        )}}