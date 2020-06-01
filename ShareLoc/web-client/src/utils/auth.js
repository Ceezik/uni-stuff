import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { history } from './utils';
import { toast } from 'react-toastify';
import { getToken } from './cookies';
import { _signup, _signin } from '../services/auth';
import { _getProfil } from '../services/user';
import { _getAll } from '../services/invitation';
import { Spinner } from 'react-bootstrap';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [invitations, setInvitations] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userChecked, setUserChecked] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (getToken()) {
            _getProfil()
                .then(res => {
                    setUser(res);
                    _getAll()
                        .then(invitations => {
                            setInvitations(invitations.length);
                            setLoading(false);
                            setUserChecked(true);
                        })
                        .catch(err => {
                            setUserChecked(true);
                            setLoading(false);
                            toast.error(err.text);
                        });
                })
                .catch(err => {
                    setUserChecked(true);
                    setLoading(false);
                    toast.error(err.text);
                });
        } else {
            setUserChecked(true);
            setLoading(false);
        }
    }, []);

    const signup = user => {
        return _signup(user)
            .then(res => {
                toast.success(res.message);
                history.push('/signin');
            })
            .catch(err => {
                if (err === 409) toast.error('Adresse mail déjà utilisée');
                else toast.error('Une erreur est survenue');
            });
    };

    const signin = credentials => {
        _signin(credentials)
            .then(res => {
                toast.success('Connecté');
                Cookies.set('token', res.token);
                _getProfil()
                    .then(user => {
                        setUser(user);
                        _getAll()
                            .then(invitations => {
                                setInvitations(invitations.length);
                                setLoading(false);
                                setUserChecked(true);
                                history.push('/colocations');
                            })
                            .catch(err => {
                                setUserChecked(true);
                                setLoading(false);
                                toast.error(err.text);
                            });
                    })
                    .catch(err => toast.error(err));
            })
            .catch(err => {
                if (err === 401) toast.error('Identifiants invalides');
                else toast.error('Une erreur est survenue');
            });
    };

    const signout = () => {
        Cookies.remove('token');
        setUser(null);
        history.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                userChecked,
                user,
                invitations,
                setInvitations,
                signin,
                signup,
                signout
            }}
        >
            {loading ? (
                <div className="full-window">
                    <Spinner animation="border" variant="dark" />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
