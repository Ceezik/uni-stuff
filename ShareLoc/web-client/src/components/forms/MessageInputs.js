import React from 'react';
import Form from 'react-bootstrap/Form';

export const MessageInput = ({ message, setMessage }) => {
    return (
        <>
            <Form.Control
                required
                placeholder="Entrez votre message"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer un message à envoyer
            </Form.Control.Feedback>
        </>
    );
};
