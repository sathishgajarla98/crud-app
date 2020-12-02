import React from 'react';
import { connect } from 'react-redux';

import './Home.css';
import Header from './Header';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Col, Container } from 'reactstrap';
import Users from './components/users/Users';
import { AddUser } from './components/addUser/AddUser';
import { fetchUsers } from './actions/user.actions';

class Home extends React.Component<any> {

    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        const { fetchUsersDispatcher } = this.props;
        fetchUsersDispatcher();       
    }

    logout() {
        this.props.logout();
    }
    editHandler = (user: any) => {
        console.log(`trying to edit the user`, user)
    }
    deleteHandler = (user: any) => {
        console.log(`trying to delete the user: ${user}`)
    }

    addUserHandler = (user:any)=>{
        console.log('adding user', user)
    }


    render() {
        const { list, permissions, errorMessage } = this.props;
        const {edit:canEditUsers, create:canAddUsers, delete:canDeleteUsers } = permissions;
        if(errorMessage){
            return (
                <div>{errorMessage}</div>
            )
        }
        return (
            <Container className="w-100">
                <Col>
                    <Header></Header>
                </Col>
                {list && list.length && <Col>
                    <Users list={list} canEdit={canEditUsers} canDelete={canDeleteUsers} editHandler={this.editHandler} deleteHandler={this.deleteHandler}></Users>
                </Col>}
                {canAddUsers && (<AddUser addUser={this.addUserHandler}/>)}
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => ({
    permissions: state.auth.permissions,
    list: state.users.list,
    user: state.auth.user,
    errorMessage: state.users.errorMessage
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    fetchUsersDispatcher: ()=> dispatch(fetchUsers()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
