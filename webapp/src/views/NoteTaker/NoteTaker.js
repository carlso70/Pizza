import React, { Component } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import {
    Panel,
    DropdownButton,
    MenuItem,
    Tabs,
    Button,
    Tab
} from 'react-bootstrap';
import { checkLoggedIn } from '../../utils/userTools';
import Notes from '../../components/Notes/Notes'

class NoteTaker extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            username: username,
            loggedIn: username == null ? false : true,
            classes: ['test0', 'test1', 'test1'],
            selectedClass: '',
            notes: {}
        };

        // TODO fetch all the notes
    }

    render() {
        if (!this.state.loggedIn) {
            return(
                    <div className="animated fadeIn" style={{padding: 60}}>
                    <LoginModal />
                    </div>
            );
        } else {
            // TODO MAKE A CLASS NOTES COMPONENT AND RENDER IT IN THE {CLASS 1 NOTES} SPOT
            // TODO MAKE A TEXT INPUT SECTION MODAL FOR CREATING NOTES WHEN PRESSING ADD BUTTON
            return (
                    <div className="animated fadeIn">
                    <Panel header={<h4>Your Notes</h4>}>
                    <Notes />
                    </Panel>
                    <Panel>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Class 1">Class 1 Notes</Tab>
                    <Tab eventKey={2} title="Class 2">Class 2 Notes</Tab>
                    <Tab eventKey={3} title="Class 3">Class 3 Notes</Tab>
                    </Tabs>
                    </Panel>
                    </div>
            );
        }
    }
}

export default NoteTaker;
