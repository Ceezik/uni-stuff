import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../utils/auth';
import Form from '../forms/Form';
import Button from '../forms/Button';
import Input from '../forms/Input';

/**
 * Composant Signin :
 * Composant permettant à un utilisateur de se connecter
 */
const Signin = () => {
    const { signin } = useAuth();
    const [error, setError] = useState('');

    const _signin = credentials => {
        signin(credentials, setError);
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3 className="mb-5">Connexion</h3>

                    <Form onSubmit={_signin}>
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
                                    Se connecter
                                </Button>
                            </Col>
                        </Row>

                        <Row className="justify-content-md-center mt-2">
                            <Col md="auto">
                                <p>
                                    Pas encore inscrit ?
                                    <a className="redirect" href="/signup">
                                        {' '}
                                        S'inscrire
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

export default Signin;
