import React, { Component } from 'react';
import ClassJumbotron from '../../components/ClassJumbotron/ClassJumbotron';

class Dashboard extends Component {
    render() {
        return (
                <div className="animated fadeIn">
                <ClassJumbotron name="CS252"
            description="This is a simple class description, this class is ight"
            onPress={() => alert("Define an on press")}
                />
                <ClassJumbotron
            name="CS307"
            description="This course is about being a waste of time"
            onPress={() => alert("Dummy Button on press")}
                />
                </div>
        )
    }
}

export default Dashboard;
