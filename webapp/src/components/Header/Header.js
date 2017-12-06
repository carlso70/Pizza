import React, { Component } from 'react';
import {
    Nav,
    NavItem,
    NavbarToggler,
    NavbarBrand,
} from 'reactstrap';

import {Button} from 'react-bootstrap';

class Header extends Component {

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    logout(e) {
        alert("Logout")
        localStorage.removeItem("pizzaUser")
        location.reload()
    }

    render() {
        return (
                <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <NavbarBrand href="#"></NavbarBrand>
                <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
                <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <Button onClick={this.logout}>Logout</Button>
                <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
                <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                </header>
        )
    }
}

export default Header;
