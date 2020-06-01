import React, { useState } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { useAuth } from '../../utils/auth';
import ControlledForm from '../forms/ControlledForm';
import { LoginInput, PasswordInput } from '../forms/AuthInputs';

function Signin() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { signin } = useAuth();

    return (
        <Container className="mt-5">
            <h1 className="mb-3">Connexion</h1>

            <ControlledForm onSubmit={() => signin({ login, password })}>
                <Form.Row>
                    <Form.Group as={Col} md="6">
                        <LoginInput login={login} setLogin={setLogin} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="6">
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                        />
                    </Form.Group>
                </Form.Row>

                <Button type="submit">Se connecter</Button>
            </ControlledForm>
        </Container>
    );
}

export default Signin;
