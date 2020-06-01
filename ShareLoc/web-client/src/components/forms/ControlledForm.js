import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function ControlledForm({ children, onSubmit }) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.checkValidity()) {
            setValidated(false);
            onSubmit();
        } else {
            setValidated(true);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {children}
        </Form>
    );
}

export default ControlledForm;
