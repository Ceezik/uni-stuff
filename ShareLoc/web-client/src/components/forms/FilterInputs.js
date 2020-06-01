import React from 'react';
import { Form } from 'react-bootstrap';

export function FilterInputs({ setFilter }) {
    return (
        <>
            <Form.Label>Filtrer par :</Form.Label>
            <Form.Control as="select" onChange={e => setFilter(e.target.value)}>
                <option value="none">Pas de filtre</option>
                <option value="weeks">Dans la semaine</option>
                <option value="months">Dans le mois</option>
                <option value="years">Dans l'année</option>
            </Form.Control>
        </>
    );
}
