import React, { Component } from 'react';
import {Label, Alert, Modal, Button, ButtonToolbar, FormGroup, Form, FormControl} from 'react-bootstrap';
import {loginUrl, createUserUrl } from '../../utils/urls'

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'true',
            validationState: null,
            username: "",
            classnotes: "",
            isLoading: false
            
        }
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 0) return 'success';
        else if (length == 0) return 'warning';
        return null;
      }

      handleClick() {
        this.setState({ isLoading: true });
    
        //TODO SAVE NOTES FOR CLASS HERE

        setTimeout(() => {
          // Completed of async action, set loading state back
          this.setState({ isLoading: false });
        }, 2000);
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
            //onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Take notes for your current class here!</HelpBlock>
        </FormGroup>
      </Form>
      <ButtonToolbar>
            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
            <Button bsStyle="primary" bsSize="large">Primary</Button>
    
            {/* Indicates a successful or positive action */}
            <Button 
                    bsStyle="success" 
                    disabled={isLoading}
                    onClick={!isLoading ? this.handleClick : null}>
                    {isLoading ? 'Saving...' : 'Save'}</Button> 
            </ButtonToolbar>
                </div>
        )
    }
}