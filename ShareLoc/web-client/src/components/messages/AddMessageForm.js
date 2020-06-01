import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ControlledForm from '../forms/ControlledForm';
import { MessageInput } from '../forms/MessageInputs';
import { _create, _edit } from '../../services/message';
import { toast } from 'react-toastify';

function AddMessageForm({
    addMessage,
    edited,
    setEdited,
    defaultMessage,
    setDefaultMessage,
    editMessage,
    idColocation
}) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage(defaultMessage.message || '');
    }, [defaultMessage]);

    const handleSubmit = () => {
        const messageId = defaultMessage.id;
        edited ? edit(messageId, { message }) : create({ message });
    };

    const create = message => {
        _create(idColocation, message)
            .then(res => {
                addMessage(res);
                setMessage('');
            })
            .catch(() => toast.error("Impossible d'envoyer le message"));
    };

    const edit = (messageId, message) => {
        _edit(idColocation, messageId, message)
            .then(res => {
                setEdited(false);
                setDefaultMessage('');
                editMessage(res);
            })
            .catch(() => toast.error('Impossible de modifier le message'));
    };

    return (
        <Col>
            <ControlledForm onSubmit={() => handleSubmit()}>
                <Form.Row className="mb-0">
                    <Col>
                        <Form.Group className="mb-0" md="6">
                            <MessageInput
                                message={message}
                                setMessage={setMessage}
                            />
                        </Form.Group>
                    </Col>

                    <Button type="submit">
                        {edited ? 'Modifier' : 'Envoyer'}
                    </Button>
                </Form.Row>
            </ControlledForm>
        </Col>
    );
}

export default AddMessageForm;
