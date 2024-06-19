// src/components/Header.js
import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  NavbarToggler,
  Collapse,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import LogoIcon from '../../assets/logo.svg';
import CrossIcon from '../../assets/cross.svg';
import { useUser } from '../../context/userContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Update state based on user context
  }, [user]);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleSideNav = () => setSideNavOpen(!sideNavOpen);

  const handleTogglerClick = () => {
    if (window.innerWidth < 768) {
      toggleSideNav();
    } else {
      toggleNavbar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = user !== null;
  const role = user?.role || localStorage.getItem('role');
  console.log(role, 'role');

  return (
    <>
      <Navbar color="fade" fade expand="md" className='header-div p-2'>
        <Link to="/" className="navbar-brand logo-text">
          <img src={LogoIcon} alt='logo' />
        </Link>
        <NavbarToggler onClick={handleTogglerClick} className='burger-icon'>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar className='align-items-center'>
           { !isAuthenticated ? 
           
           <>
           <NavItem>
              <Link to="/blog">Blog</Link>
            </NavItem> 
            <NavItem>
              <Link to="/about">About us</Link>
            </NavItem>
           </>
            
            : 
            <NavItem>
            <Link to="/tickets">Tickets</Link>
          </NavItem>
            }
            <NavItem>
              <Link to="/contact">Contact</Link>
            </NavItem>
            {isAuthenticated ? (
              <>
                <NavItem>
                <Link to="/bookings">Booking</Link>
                </NavItem>
                <NavItem>
                <Link to="/profile">Profile</Link>
                </NavItem>
                <NavItem>
                  <Button className="ml-2 custom-btn" onClick={handleLogout}>Logout</Button>
                </NavItem>
                {role === 'admin' && (
                  <NavItem>
                    <Link to="/admindashboard">
                      <Button className="ml-2 custom-btn">Admin Dashboard</Button>
                    </Link>
                  </NavItem>
                )}
              </>
            ) : (
              <>
                <NavItem>
                  <Link to="/login">
                    <Button className="ml-2 custom-btn">Login</Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/signup">
                    <Button className="ml-2 custom-btn">Signup</Button>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>

      <div className={`side-nav ${sideNavOpen ? 'open' : ''}`}>
        <div className="side-nav-header">
          <img src={CrossIcon} alt="close" onClick={toggleSideNav} className="close-icon" />
        </div>
        <ListGroup className='list-group-data'>
          <ListGroupItem>
            <Link to="/blog" onClick={toggleSideNav}>Blog</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/about" onClick={toggleSideNav}>About us</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link to="/contact" onClick={toggleSideNav}>Contact</Link>
          </ListGroupItem>
          {isAuthenticated ? (
            <>
              <ListGroupItem>
                <Button className="mb-btn" onClick={handleLogout}>Logout</Button>
              </ListGroupItem>
              {role === 'admin' && (
                <ListGroupItem>
                  <Link to="/admindashboard" onClick={toggleSideNav}>
                    <Button className="mb-btn">Admin Dashboard</Button>
                  </Link>
                </ListGroupItem>
              )}
            </>
          ) : (
            <>
              <ListGroupItem>
                <Link to="/login" onClick={toggleSideNav}>
                  <Button className="mb-btn">Login</Button>
                </Link>
              </ListGroupItem>
              <ListGroupItem>
                <Link to="/signup" onClick={toggleSideNav}>
                  <Button className="mb-btn">Signup</Button>
                </Link>
              </ListGroupItem>
            </>
          )}
        </ListGroup>
      </div>

      {sideNavOpen && <div className="side-nav-overlay" onClick={toggleSideNav}></div>}
    </>
  );
};

export default Header;
