import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserCircle,
    faSignOutAlt,
    faCog,
    faHistory
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../utils/auth';

/**
 * Composant Menu :
 * Menu de navigation du site
 */
const Menu = () => {
    const { user, signout } = useAuth();
    const { pathname } = useLocation();

    return (
        <>
            <Navbar expand="md">
                <Navbar.Brand className="mb-1">
                    <Link to="/">
                        Crystal<span style={{ color: '#68b684' }}>Z</span>
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user ? (
                        <>
                            <Nav className="mr-auto">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="nav-link-active"
                                    to="/configs"
                                >
                                    Configurations
                                </NavLink>
                                <NavLink
                                    className="nav-link"
                                    activeClassName="nav-link-active"
                                    to="/leaderboard"
                                >
                                    Classement
                                </NavLink>
                            </Nav>
                            <Nav className="align-items-center">
                                <DropdownButton
                                    alignRight
                                    title={user.username}
                                >
                                    <Dropdown.Item href={`/users/${user.id}`}>
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faUserCircle}
                                        />
                                        Mon profil
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/games">
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faHistory}
                                        />
                                        Historique des parties
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/settings">
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faCog}
                                        />
                                        Paramètres
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={e => signout()}>
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faSignOutAlt}
                                        />
                                        Se déconnecter
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Nav>
                        </>
                    ) : (
                        <>
                            <Nav className="mr-auto"></Nav>
                            <Nav className="align-items-center">
                                {pathname !== '/signup' && (
                                    <NavLink className="nav-link" to="/signup">
                                        S'inscrire
                                    </NavLink>
                                )}
                                {pathname !== '/signin' && (
                                    <NavLink className="nav-link" to="/signin">
                                        <Button
                                            variant="success"
                                            className="btn-primary"
                                        >
                                            Se connecter
                                        </Button>
                                    </NavLink>
                                )}
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Menu;
