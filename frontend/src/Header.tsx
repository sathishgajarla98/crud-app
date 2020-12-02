import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { logout } from './actions/authentication.actions';

class Header extends React.Component<any> {
    state = {
        collapsed: false,
    };
    handleClick = (e: any) => {
        console.log('click ', e);
    };

    logoutHandler = ()=>{
        const { logoutAction} = this.props
        logoutAction();
    }

    render() {
        return (

            <div>
                <Navbar color="light" light expand>
                    <NavbarBrand href="/">User CRUD</NavbarBrand>
                    <Collapse isOpen={true} navbar>
                        <NavbarText ><Button onClick={this.logoutHandler}>Lougout</Button></NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    logoutAction: ()=> dispatch(logout()),
})
export default connect(null, mapDispatchToProps)(Header);
