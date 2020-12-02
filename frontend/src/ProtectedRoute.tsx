import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component<any> {

    render() {
        const Component = this.props.component;
        const isAuthenticated = this.props.isAuthenticated;
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}
const mapStatesToProps=(state:any)=>({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStatesToProps)(ProtectedRoute);