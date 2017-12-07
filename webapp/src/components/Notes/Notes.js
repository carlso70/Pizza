import React, { Component } from 'react';
import {Label, Alert, Modal, Button, ButtonToolbar, FormGroup, Form, FormControl, ControlLabel, HelpBlock, DropdownButton, MenuItem} from 'react-bootstrap';
import {loginUrl, createUserUrl, saveNotesUrl } from '../../utils/urls';
import { checkLoggedIn } from '../../utils/userTools';
import LoginModal from '../LoginModal/LoginModal';
import NoteTaker from '../../views/NoteTaker/NoteTaker';


class Notes extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            show: 'true',
            validationState: null,
            username: username,
            classnotes: "",
            isLoading: false,
            class: "Class1",
            value: ["TESTING HERE KATUE"],
            showSaveModal: false,
            loggedIn: username == null ? false : true
           // isLoading: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
        this.classchange = this.classchange.bind(this)
    }

      save() {
        this.setState({
          showSaveModal: false
        });

      
        fetch(saveNotesUrl, {
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
          return response;
      }).then(function(data) {
          if (data) {
              console.log(data)
              // Save the user in localstorage
          }
      });

      location.reload()
      
      }

      handleChange(e){
        this.setState({
              classnotes: e.target.value
        });
      }

      classchange(e){
        this.setState({
          class: e.target.value
        });
      }

    render() {
      if (!this.state.loggedIn) {
        return(
                <div className="animated fadeIn" style={{padding: 60}}>
                <LoginModal />
                </div>
        );
      } else {
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
            rows={10}
          />
          <FormControl.Feedback />
          <HelpBlock>Take notes for your current class here!</HelpBlock>
        </FormGroup>
      </Form>
      <ButtonToolbar>
            {/* Indicates a successful or positive action */}  
            <Button 
                    bsStyle="success" 
                    onClick = {() => this.setState({showSaveModal:true})}>
                     Save</Button> 
            </ButtonToolbar>
                
                
            <Modal show={this.state.showSaveModal} onHide={this.close}>
            <Modal.Header closeButton>
            <Modal.Title>Add Notes to Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <FormGroup>
            <FormControl 
                type="text" 
                placeholder="Class Name" 
                value={this.state.class} 
                onChange={this.classchange}/>
            </FormGroup>
           </Form>
           </Modal.Body>
           <Modal.Footer>
           <ButtonToolbar>
           <Button onClick={this.save}>Save</Button>
            <Button onClick={this.close}>Cancel</Button>
            </ButtonToolbar>
           </Modal.Footer>
            </Modal>

                </div>
        );
      }
    }
}

export default Notes;