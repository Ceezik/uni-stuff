import React from 'react';
import Form from 'react-bootstrap/Form';

export const LoginInput = ({ login, setLogin }) => {
    return (
        <>
            <Form.Control
                required
                type="email"
                placeholder="Adresse mail"
                value={login}
                onChange={e => setLogin(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer une adresse mail valide
            </Form.Control.Feedback>
        </>
    );
};

export const PasswordInput = ({ password, setPassword }) => {
    return (
        <>
            <Form.Control
                required
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer un mot de passe
            </Form.Control.Feedback>
        </>
    );
};

export const FirstnameInput = ({ firstname, setFirstname }) => {
    return (
        <>
            <Form.Control
                required
                type="text"
                placeholder="Prénom"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer un prénom
            </Form.Control.Feedback>
        </>
    );
};

export const LastnameInput = ({ lastname, setLastname }) => {
    return (
        <>
            <Form.Control
                required
                type="text"
                placeholder="Nom"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer un nom
            </Form.Control.Feedback>
        </>
    );
};
