import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const Header = () => {
  return (
    <Navbar color="dark" dark expand="md">
        <NavLink href="/" className="navbar-brand">Car Parking App</NavLink>
        <Nav className="" navbar>
          <NavItem>
            <NavLink href="/search">Search</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Contact</NavLink>
          </NavItem>
        </Nav>
    </Navbar>
  );
};

export default Header;
