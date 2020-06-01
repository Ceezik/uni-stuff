import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Col from 'react-bootstrap/Col';

function SearchColocations({ colocations, filterColocations }) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        colocations &&
            filterColocations(
                colocations.filter(colocation =>
                    colocation.name.toLowerCase().includes(search.toLowerCase())
                )
            );
    }, [search, colocations, filterColocations]);

    return (
        <Col>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                    type="text"
                    placeholder="Rechercher"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </InputGroup>
        </Col>
    );
}

export default SearchColocations;
