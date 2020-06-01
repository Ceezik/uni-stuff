import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Input from '../forms/Input';
import Form from '../forms/Form';
import Button from '../forms/Button';
import { useAuth } from '../../utils/auth';

/**
 * Composant Settings :
 * Formulaire de gestion de son compte
 */
const Settings = () => {
    const { user, changeUsername, changePassword } = useAuth();
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const updateUsername = ({ username }) => {
        changeUsername(username, setUsernameError);
    };

    const updatePassword = ({ currentPassword, newPassword }) => {
        changePassword(currentPassword, newPassword, setPasswordError);
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3 className="mb-5">Nom d'utilisateur</h3>

                    <Form onSubmit={updateUsername}>
                        {usernameError && (
                            <Alert variant="danger">{usernameError}</Alert>
                        )}

                        <Input
                            type="text"
                            name="username"
                            placeholder="Nom d'utilisateur"
                            defaultValue={user.username}
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

                        <Row className="justify-content-end">
                            <Col xs="auto">
                                <Button
                                    variant="success"
                                    className="btn-primary"
                                    type="submit"
                                >
                                    Modifier
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <h3 className="mb-5 mt-5">Changer de mot de passe</h3>

                    <Form onSubmit={updatePassword}>
                        {passwordError && (
                            <Alert variant="danger">{passwordError}</Alert>
                        )}

                        <Input
                            type="password"
                            name="currentPassword"
                            placeholder="Mot de passe actuel"
                            validationSchema={{
                                required: 'Ce champ est obligatoire'
                            }}
                        />

                        <Input
                            type="password"
                            name="newPassword"
                            placeholder="Nouveau mot de passe"
                            validationSchema={{
                                required: 'Ce champ est obligatoire'
                            }}
                        />

                        <Row className="justify-content-end">
                            <Col xs="auto">
                                <Button
                                    variant="success"
                                    className="btn-primary"
                                    type="submit"
                                >
                                    Modifier
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Settings;
