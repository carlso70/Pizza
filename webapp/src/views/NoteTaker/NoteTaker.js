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
import {loginUrl, createUserUrl, saveNotesUrl, getUserUrl } from '../../utils/urls';

var classestmp = new Array();
var notestmp = new Array();

class NoteTaker extends Component {
    constructor(props) {
        super(props);
        var username = checkLoggedIn();
        this.state = {
            username: username,
            loggedIn: username == null ? false : true,
            classes: [],
            selectedClass: '',
            notes: []
        };

        // TODO fetch all the notes
        this.getnotes();

    }

    getnotes(){
        fetch(getUserUrl, {
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
            return response.json();
        }).then((responseJson) => {
            console.log(responseJson);
            if (responseJson){
                var classcnt = 0;
                var notes = responseJson.notes;
                for(var i = 0; i < notes.length; i++){
                    var obj = notes[i];
                    if(classestmp.length == 0)
                    {
                        classestmp[classcnt] = obj.course_notes_name;
                        notestmp[classcnt] = obj.course_note;
                        classcnt++;
                    }
                    else{
                        for(var j = 0; j < classcnt; j++){
                            if(obj.course_notes_name == classestmp[j])
                            {
                                notestmp[j] = notestmp[j] + '\n' + obj.course_note;
                                break;
                            }
                            else if(j == classcnt-1){
                                classestmp[classcnt] = obj.course_notes_name;
                                notestmp[classcnt] = obj.course_note;
                                classcnt++;
                                break;
                            }

                        }
                    }
                }

                console.log(classestmp);
                console.log(notestmp);

                var newnotes;
                for(var k = 0; k < notestmp.length; k++)
                {
                    newnotes = notestmp[k].split('\n').map((item, i) => {
                        return <p key={i}>{item}</p>;
                    });

                    notestmp[k] = newnotes;
                }
                
                this.setState({
                    classes: classestmp,
                    notes: notestmp
                });
            }
                
            
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
            // TODO MAKE A CLASS NOTES COMPONENT AND RENDER IT IN THE {CLASS 1 NOTES} SPOT
            // TODO MAKE A TEXT INPUT SECTION MODAL FOR CREATING NOTES WHEN PRESSING ADD BUTTON
            return (
                    <div className="animated fadeIn">
                    <Panel header={<h4>Your Notes</h4>}>
                    <Notes />
                    </Panel>
                    <Panel>
                    <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
                        {
                            this.state.classes.map((item, index) => {
                                return <Tab eventKey={index} title={item}>{this.state.notes[index]}</Tab>
                            })
                        }
                    </Tabs>
                    </Panel>
                    </div>
            );
        }
    }
}

export default NoteTaker;
