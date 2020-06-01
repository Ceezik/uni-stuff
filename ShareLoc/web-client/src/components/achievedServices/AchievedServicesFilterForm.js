import React from 'react';
import { Form } from 'react-bootstrap';
import { FilterInputs } from '../forms/FilterInputs';

function AchievedServicesFilterForm({ setFilter }) {
    return (
        <>
            <Form.Group>
                <FilterInputs setFilter={setFilter} />
            </Form.Group>
        </>
    );
}

export default AchievedServicesFilterForm;
