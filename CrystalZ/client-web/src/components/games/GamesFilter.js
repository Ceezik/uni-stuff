import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const FILTERS = [
    { value: 'w', text: 'Cette semaine' },
    { value: 'M', text: 'Ce mois' },
    { value: 'all', text: 'Tout afficher' }
];

/**
 * Composant GamesFilter :
 * Permet de filtrer l'historique des parties
 *
 * props :
 *   - filter : Le filtre
 *   - setFilter : Fonction permettant de modifier le filtre
 */
function GamesFilter({ filter, setFilter }) {
    return (
        <Row className="justify-content-end mb-5">
            <Col xs="auto">
                {FILTERS.map(f => (
                    <Button
                        key={f.value}
                        variant="success"
                        className={`mx-2 ${
                            filter === f.value ? 'btn-primary' : 'btn-dark'
                        }`}
                        onClick={() => setFilter(f.value)}
                    >
                        {f.text}
                    </Button>
                ))}
            </Col>
        </Row>
    );
}

export default GamesFilter;
