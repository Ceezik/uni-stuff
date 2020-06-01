import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ControlledForm from '../forms/ControlledForm';
import { NameInput } from '../forms/ColocationInputs';
import { _create } from '../../services/colocation';
import { toast } from 'react-toastify';

function AddColocationForm({ addColocation }) {
    const [name, setName] = useState('');

    const create = colocation => {
        _create(colocation)
            .then(res => {
                addColocation(res);
                setName('');
            })
            .catch(() => toast.error('Impossible de créer la colocation'));
    };

    return (
        <Col>
            <ControlledForm onSubmit={() => create({ name })}>
                <Form.Row className="mb-3">
                    <Col>
                        <Form.Group className="mb-0" md="6">
                            <NameInput name={name} setName={setName} />
                        </Form.Group>
                    </Col>

                    <Button type="submit">Créer</Button>
                </Form.Row>
            </ControlledForm>
        </Col>
    );
}

export default AddColocationForm;
