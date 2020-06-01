import React from 'react';
import Form from 'react-bootstrap/Form';

export const NameInput = ({ name, setName }) => {
    return (
        <>
            <Form.Control
                required
                placeholder="Nom"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer un nom
            </Form.Control.Feedback>
        </>
    );
};
