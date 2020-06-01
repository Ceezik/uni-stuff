import React from 'react';
import Form from 'react-bootstrap/Form';

export const TitleInput = ({ title, setTitle }) => {
    return (
        <>
            <Form.Control
                required
                placeholder="Titre"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer le titre du service
            </Form.Control.Feedback>
        </>
    );
};

export const DescriptionInput = ({ description, setDescription }) => {
    return (
        <Form.Control
            placeholder="Description"
            as="textarea"
            rows="3"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
    );
};

export const CostInput = ({ cost, setCost }) => {
    return (
        <>
            <Form.Control
                required
                placeholder="Coût"
                type="number"
                value={cost}
                onChange={e => setCost(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Veuillez entrer un coût
            </Form.Control.Feedback>
        </>
    );
};
