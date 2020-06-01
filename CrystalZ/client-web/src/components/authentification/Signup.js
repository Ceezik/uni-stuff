import React, { useState } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../utils/auth';
import Form from '../forms/Form';
import Button from '../forms/Button';
import Input from '../forms/Input';

/**
 * Composant Signin :
 * Composant permettant à un utilisateur de s'inscrire
 */
const Signup = () => {
    const { signup } = useAuth();
    const [error, setError] = useState('');

    const _signup = user => {
        signup(user, setError);
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3 className="mb-5">Inscription</h3>

                    <Form onSubmit={_signup}>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Input
                            type="text"
                            name="username"
                            placeholder="Nom d'utilisateur"
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                                minLength: {
                                    value: 3,
                                    message:
                                        "Votre nom d'utilisateur doit faire entre 3 et 50 caractères"
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "Votre nom d'utilisateur doit faire entre 3 et 50 caractères"
                                }
                            }}
                        />

                        <Input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            validationSchema={{
                                required: 'Ce champ est obligatoire'
                            }}
                        />

                        <Row className="justify-content-md-center mt-5">
                            <Col md="auto">
                                <Button
                                    variant="success"
                                    className="btn-primary"
                                    type="submit"
                                >
                                    S'inscrire
                                </Button>
                            </Col>
                        </Row>

                        <Row className="justify-content-md-center mt-2">
                            <Col md="auto">
                                <p>
                                    Déjà inscrit ?
                                    <a className="redirect" href="/signin">
                                        {' '}
                                        Se connecter
                                    </a>
                                </p>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
