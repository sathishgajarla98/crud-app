import React from 'react';
import { Form, Input, Button, FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/authentication.actions';

import './Login.css';
import { Redirect } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    onFinish = () => {
        const { username, password } = this.state;
        if (username && password) {
            this.props.authenticate(username, password);
        }
    };
    onChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    render() {
        const { username, password } = this.state;
        const { errorMessage } = this.props;
        console.log('errormessage', errorMessage)
        return (
            this.props.isAuthenticated ? (<Redirect to='/' />) : (
                <div className="login-container row">
                    <div className="col-sm-12 col-md-6 offset-md-3 my-auto">
                        <div className="card-block w-50 md-25 mx-auto">
                            <Form name="normal_login">
                                <FormGroup>
                                    <Label for="username">User Name</Label>
                                    <Input type="text" name="username" id="username" onChange={this.onChange} placeholder="Enter username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" onChange={this.onChange} placeholder="Enter password" />
                                </FormGroup>
                                <Button disabled={!username || !password} color="primary" className="login-form-button primary" onClick={this.onFinish}>Log in </Button>
                            </Form>
                            {errorMessage && (<div style={{ color: 'red', padding: "10px" }}>{errorMessage}</div>)}
                        </div>
                    </div>
                </div>

            )
        );
    }
};

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    authenticate: (username: string, password: string) => dispatch(authenticate(username, password))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);