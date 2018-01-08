import React from 'react';
import {
    Navbar
} from 'react-bootstrap';


const NavbarHeader = () => {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Udacity Readable Project</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
        </Navbar>
    );
};

export default NavbarHeader;

