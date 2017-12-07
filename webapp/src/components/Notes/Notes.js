import React, { Component } from 'react';
import {Label, Alert, Modal, Button, ButtonToolbar, FormGroup, Form, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import {loginUrl, createUserUrl } from '../../utils/urls'

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'true',
            validationState: null,
            username: "",
            classnotes: "",
            isLoading: false,
            class: "",
            value: ["TESTING HERE KATUE"],
           // isLoading: true
        }

        this.handleChange = this.handleChange.bind(this)
    }

      handleClick() {
        
      }

      handleChange(e){
        this.setState({
              classnotes: e.target.value
        });
      }

    render() {
        return (
            <div>
                <Form>
        <FormGroup
          controlId="formBasicText"        
        >

          <ControlLabel>Take Notes For Your Class!</ControlLabel>
          <FormControl
            type="text"
            value={this.state.classnotes}
            placeholder="Begin entering your notes..."
            onChange={this.handleChange}
            componentClass = "textarea"
            rows={4}
          />
          <FormControl.Feedback />
          <HelpBlock>Take notes for your current class here!</HelpBlock>
        </FormGroup>
      </Form>
      <ButtonToolbar>
            {/* Indicates a successful or positive action */}
            <Button 
                    bsStyle="success" 
                    onClick = {this.handleClick }>
                     Save</Button> 
            </ButtonToolbar>
                </div>
        )
    }
}

export default Notes;