import React, { useState } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import ControlledForm from '../forms/ControlledForm';
import { PasswordInput } from '../forms/AuthInputs';
import { _updatePassword } from '../../services/user';
import { toast } from 'react-toastify';
import LoadingButton from '../forms/LoadingButton';

function EditPassword({ setVisible }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const editPassword = credentials => {
        setLoading(true);
        setError('');
        _updatePassword(credentials)
            .then(res => {
                toast.success(res.message);
                setVisible(false);
            })
            .catch(err => {
                setLoading(false);
                if (err === 406)
                    setError(
                        'Le mot de passe entré ne corrrespond pas à votre mot de passe actuel'
                    );
                else setError('Une erreur est survenue');
            });
    };

    return (
        <ControlledForm
            onSubmit={() => editPassword({ currentPassword, newPassword })}
        >
            <Form.Group as={Row}>
                <Form.Label column md={3}>
                    Mot de passe actuel :
                </Form.Label>
                <Col md="4">
                    <PasswordInput
                        password={currentPassword}
                        setPassword={setCurrentPassword}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column md={3}>
                    Nouveau mot de passe :
                </Form.Label>
                <Col md="4">
                    <PasswordInput
                        password={newPassword}
                        setPassword={setNewPassword}
                    />
                </Col>
            </Form.Group>

            {error && (
                <Row>
                    <Col md={7}>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                </Row>
            )}

            <Button variant="light" onClick={() => setVisible(false)}>
                Annuler
            </Button>

            <LoadingButton
                loading={loading}
                variant="danger"
                className="ml-3"
                type="submit"
            >
                Sauvegarder
            </LoadingButton>
        </ControlledForm>
    );
}

export default EditPassword;
