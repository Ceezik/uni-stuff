import React, { useState } from 'react';
import { Button, Form, Col, Accordion } from 'react-bootstrap';
import ControlledForm from '../forms/ControlledForm';
import { _create } from '../../services/service';
import { toast } from 'react-toastify';
import {
    TitleInput,
    DescriptionInput,
    CostInput
} from '../forms/ServiceInputs';
import { useParams } from 'react-router-dom';

function AddServiceForm({ addService }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const { colocationId } = useParams();

    const create = service => {
        _create(colocationId, service)
            .then(res => {
                addService(res);
                setTitle('');
                setDescription('');
                setCost('');
            })
            .catch(err => {
                toast.error("Impossible d'ajouter le service");
            });
    };

    return (
        <Accordion defaultActiveKey="1">
            <Accordion.Toggle
                as={Button}
                variant="outline-primary"
                type="submit"
                className="mb-2"
                eventKey="0"
            >
                Proposer un nouveau service
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <ControlledForm
                    onSubmit={() => create({ title, description, cost })}
                >
                    <Form.Row>
                        <Form.Group as={Col}>
                            <TitleInput title={title} setTitle={setTitle} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <CostInput cost={cost} setCost={setCost} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <DescriptionInput
                                description={description}
                                setDescription={setDescription}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Button type="submit">Ajouter</Button>
                        </Form.Group>
                    </Form.Row>
                </ControlledForm>
            </Accordion.Collapse>
        </Accordion>
    );
}

export default AddServiceForm;
