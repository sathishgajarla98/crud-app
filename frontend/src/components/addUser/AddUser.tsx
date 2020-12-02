import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import './AddUser.css';

export class AddUser extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: ''
        }
    }

    onSubmit = () => {
        const {firstName, lastName, email} = this.state;
        const userObject = {
            firstName,
            lastName,
            email
        }
        const {addUser} = this.props;
        addUser(userObject);
        this.setState({firstName:'',lastName:'',email:''})
    }
    onChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { firstName, lastName, email } = this.state;
        return (
            <Row className="col-sm-12 col-md-6 offset-md-3 my-auto">
                <Col xs="10" offset-xs="2" md="3" className="padding-bottom-5">
                    <input type="text" name="firstName" placeholder="First name" onChange={this.onChange}></input>
                </Col>
                <Col xs="10" offset-xs="2" md="3" className="padding-bottom-5">
                    <input type="text" name="lastName" placeholder="Last name" onChange={this.onChange}></input>
                </Col>
                <Col xs="10" offset-xs="2" md="3" className="padding-bottom-5">
                    <input type="email" name="email" placeholder="email" onChange={this.onChange}></input>
                </Col>
                <Col xs="10" offset-xs="2" md="3" className="padding-bottom-5">
                    <Button color="primary" disabled={!firstName || !lastName || !email} onClick={this.onSubmit}>Add User</Button>
                </Col>
            </Row>
        )
    }
}