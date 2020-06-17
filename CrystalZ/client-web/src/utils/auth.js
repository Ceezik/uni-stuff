import React, { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from './request';
import Cookies from 'js-cookie';
import { Row, Col, Spinner, Container } from 'react-bootstrap';

const AuthContext = createContext();

/**
 * Contexte d'authentification :
 * Permet d'avoir accès à la variable user et aux méthodes d'authentification partout dans le code
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        request
            .get('/user')
            .then(res => {
                setUser(res.data);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col xs="auto">
                        <Spinner animation="border" variant="light" />
                    </Col>
                </Row>
            </Container>
        );
    }

    const signup = (credentials, setError) => {
        return request
            .post('/signup', credentials)
            .then(res => {
                setError('');
                Cookies.set('token', res.data.token, { expires: 365 });
                setUser(res.data.user);
                history.push('/configs');
            })
            .catch(err => {
                if (err.response.status === 409)
                    setError("Ce nom d'utilisateur est déjà utilisé");
                else setError('Une erreur est survenue');
            });
    };

    const signin = (credentials, setError) => {
        return request
            .post('/signin', credentials)
            .then(res => {
                setError('');
                Cookies.set('token', res.data.token, { expires: 365 });
                setUser(res.data.user);
                history.push('/configs');
            })
            .catch(err => {
                if (err.response.status === 401)
                    setError('Mauvais identifiants');
                else setError('Une erreur est survenue');
            });
    };

    const changeUsername = (username, setError) => {
        return request
            .put('/user', { username })
            .then(res => {
                toast.success("Nom d'utilisateur modifié");
                setError('');
                setUser(res.data);
            })
            .catch(err => {
                if (err.response.status === 409)
                    setError("Ce nom d'utilisateur est déjà utilisé");
                else setError('Une erreur est survenue');
            });
    };

    const changePassword = (currentPassword, newPassword, setError) => {
        return request
            .put('/user/password', { currentPassword, newPassword })
            .then(() => {
                toast.success('Mot de passe modifié');
                setError('');
            })
            .catch(err => {
                if (err.response.status === 401)
                    setError('Mauvais mot de passe');
                else setError('Une erreur est survenue');
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
                user,
                signup,
                signin,
                changeUsername,
                changePassword,
                signout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
