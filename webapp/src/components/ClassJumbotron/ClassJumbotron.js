import React, { Component } from 'react';
import { Jumbotron, Button} from 'react-bootstrap';

export default class ClassJumbotron extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Jumbotron>
                <h1>{this.props.name}</h1>
                <p>{this.props.description}</p>
                <p><Button bsStyle="primary" onClick={this.props.onPress}>Learn more</Button></p>
                </Jumbotron>
        )
    }
}
