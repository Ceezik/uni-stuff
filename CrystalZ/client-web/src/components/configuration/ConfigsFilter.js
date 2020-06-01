import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';

/**
 * Composant ConfigsFilter:
 * Filtres sur la liste des configurations
 *
 * props :
 *   - setName : Fonction permettant de modifier le filtre sur le nom
 *   - gameModes : Liste des modes de jeu disponibles
 *   - gameModeFilter : Liste des filtres sur le mode de jeu
 *   - setGameModeFilter : Fonction permettant de modifier la liste des filtres
 *                         sur le mode de jeu
 */
function ConfigsFilter({
    setName,
    gameModes,
    gameModeFilter,
    setGameModeFilter
}) {
    const [search, setSearch] = useState('');

    const debounceSearch = useCallback(
        _.debounce(s => setName(s), 300),
        []
    );

    const handleGameModeFilter = gameMode => {
        if (gameModeFilter.includes(gameMode)) {
            if (gameModeFilter.length > 1)
                setGameModeFilter(gameModeFilter.filter(g => g !== gameMode));
        } else {
            setGameModeFilter([...gameModeFilter, gameMode]);
        }
    };

    return (
        <Row className="mb-5">
            <Col>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faSearch} color="white" />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="text"
                        placeholder="Rechercher par nom"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            debounceSearch(e.target.value);
                        }}
                    />
                </InputGroup>
            </Col>

            <Col md="auto">
                {gameModes.map(g => (
                    <Button
                        key={g}
                        variant="success"
                        className={`mx-2 ${
                            gameModeFilter.includes(g)
                                ? 'btn-primary'
                                : 'btn-dark'
                        }`}
                        onClick={() => handleGameModeFilter(g)}
                    >
                        {g}
                    </Button>
                ))}
            </Col>
        </Row>
    );
}

export default ConfigsFilter;
