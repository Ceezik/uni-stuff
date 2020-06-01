import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../../utils/auth';
import { Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';

function Menu() {
    const { user, invitations } = useAuth();

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand className="mb-1">ShareLoc</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user ? (
                        <>
                            <Nav className="mr-auto">
                                <NavLink className="nav-link" to="/invitations">
                                    Invitations{' '}
                                    {invitations > 0 && (
                                        <Badge pill variant="danger">
                                            {invitations}
                                        </Badge>
                                    )}
                                </NavLink>
                                <NavLink className="nav-link" to="/colocations">
                                    Colocations
                                </NavLink>
                                <NavLink className="nav-link" to="/messages">
                                    Messagerie
                                </NavLink>
                            </Nav>

                            <Nav>
                                <Link to="/account">
                                    <FontAwesomeIcon
                                        size="2x"
                                        color="white"
                                        icon={faUserCircle}
                                    />
                                </Link>
                            </Nav>
                        </>
                    ) : (
                        <>
                            <Nav className="mr-auto" />
                            <Nav className="align-items-center">
                                <NavLink className="nav-link" to="/signup">
                                    S'inscrire
                                </NavLink>
                                <NavLink to="/signin">
                                    <Button variant="outline-light">
                                        Se connecter
                                    </Button>
                                </NavLink>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>

                {/* <Navbar.Collapse className="justify-content-end">
                    {user ? (
                        <Nav>
                            <Link to="/account">
                                <FontAwesomeIcon
                                    size="2x"
                                    color="white"
                                    icon={faUserCircle}
                                />
                            </Link>
                        </Nav>
                    ) : (
                        <Nav className="align-items-center">
                            <NavLink className="nav-link" to="/signup">
                                S'inscrire
                            </NavLink>
                            <NavLink to="/signin">
                                <Button variant="outline-light">
                                    Se connecter
                                </Button>
                            </NavLink>
                        </Nav>
                    )}
                </Navbar.Collapse> */}
            </Navbar>
        </>
    );
}

export default Menu;
