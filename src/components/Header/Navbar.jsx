import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import LoginFormPopup from '../Common/LoginForm';
import SignupFormPopup from '../Common/SignupForm';
import { logoutUser } from '../../featrues/userAuthSlice';

export const CustomNavbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
 
  useEffect(() => {
    console.log('User state changed:', user);
    if (user) {
      setShowLoginModal(false);
      setShowSignupModal(false);
    }
  }, [user]);

  const handleShowLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleShowSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleClose = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    if (user) {
      dispatch(logoutUser(user.username));
      // console.log(`logut req username ${user.username}`)
    }
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} expand={expand} className="navbar-light flex-nowrap custom-navbar">
          <Container fluid>
            <Navbar.Brand href="#home" className='padding-l-136 pl-6'>
              <span className='display-3 text-dark fw-bold font-24'>MedicalFunc</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='ms-auto' />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="d-flex justify-content-around gap-3">
                  <Nav.Link href="#home" className='text-muted font-14 fw-bold responsive-font'>Home</Nav.Link>
                  <Nav.Link href="#product" className='text-muted font-14 fw-bold responsive-font'>Product</Nav.Link>
                  <Nav.Link href="#pricing" className='text-muted font-14 fw-bold responsive-font'>Pricing</Nav.Link>
                  <Nav.Link href="#contact" className='text-muted font-14 fw-bold responsive-font'>Contact</Nav.Link>
                </Nav>
                
                <div className="user-actions ms-auto d-flex align-items-center gap-3">
                  <Form className="d-flex gap-3">
                    {user ? (
                      <div className='d-flex align-items-center flex-lg-row gap-3'>
                        <Button variant="" className='primary-background-color responsive-font pl-1' onClick={handleLogout}>
                          <span className='text-white font-14 fw-bold'>LogOut</span>
                        </Button>
                        <span className="primary-color font-14 fw-bold responsive-font login-msg-text hi-username">Hi {user.username}</span>
                      </div>
                    ) : (
                      <Button variant="outline-none" className='primary-color font-14 fw-bold responsive-font' onClick={handleShowLogin}>
                        Login
                      </Button>
                    )}
                  </Form>
                  {!user && (
                    <Form className='padding-r-143 padding-0 d-flex align-item-baseline'>
                      <Button variant="" className='primary-background-color responsive-font pl-1' onClick={handleShowSignup}>
                        <span className='text-white font-14 fw-bold'>Join US</span>
                        <i className="bi bi-arrow-right text-white"></i>
                      </Button>
                    </Form>
                  )}
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <LoginFormPopup show={showLoginModal} handleClose={handleClose} toggleSignup={handleShowSignup} />
      <SignupFormPopup show={showSignupModal} handleClose={handleClose} />
    </>
  );
};

export default CustomNavbar;
