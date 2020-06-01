import React, { useState } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { useAuth } from '../../utils/auth';
import ControlledForm from '../forms/ControlledForm';
import {
    LoginInput,
    PasswordInput,
    FirstnameInput,
    LastnameInput
} from '../forms/AuthInputs';

function Signup() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();

    return (
        <Container className="mt-5">
            <h1 className="mb-3">Inscription</h1>

            <ControlledForm
                onSubmit={() =>
                    signup({ firstname, lastname, login, password })
                }
            >
                <Form.Row>
                    <Form.Group as={Col}>
                        <FirstnameInput
                            firstname={firstname}
                            setFirstname={setFirstname}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <LastnameInput
                            lastname={lastname}
                            setLastname={setLastname}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <LoginInput login={login} setLogin={setLogin} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                        />
                    </Form.Group>
                </Form.Row>

                <Button type="submit">S'inscrire</Button>
            </ControlledForm>
        </Container>
    );
}

export default Signup;
