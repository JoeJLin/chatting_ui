import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Col, Row, Button} from 'react-bootstrap';

export class login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username: "",
             password: ""
        }
    }

    handleChange = name => event => {
        this.setState(
          { [name]: event.target.value }
        )
    } 
    
    submit = () => {
        console.log("submit")
    }


    render() {
        return (
            <Form>
                <Form.Group as={Row} controlId="formPlaintextUsername">
                    <Form.Label column sm="2">Username</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Username" onChange={this.handleChange("username")}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">Password</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange("password")}/>
                    </Col>
                </Form.Group>
                <Button type="submit" onClick={this.submit}>Submit form</Button>
            </Form>
        )
    }
}

export default login;
