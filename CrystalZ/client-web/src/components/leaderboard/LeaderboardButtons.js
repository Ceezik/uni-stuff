import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const FILTERS = ['SUPREMACY', 'FLAG', 'TIME', 'Victoires'];

/**
 * Composant LeaderboardButtons :
 * Permet de choisir le critère déterminant les meilleurs joueurs
 *
 * props :
 *   - filter : Le critère de classement
 *   - setFilter : Fonction permettant de modifier le critère de classement
 */
function LeaderboardButtons({ filter, setFilter }) {
    return (
        <Row className="justify-content-center mb-5">
            <Col xs="auto">
                {FILTERS.map(f => (
                    <Button
                        key={f}
                        variant="success"
                        className={`mx-2 ${
                            filter === f ? 'btn-primary' : 'btn-dark'
                        }`}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </Button>
                ))}
            </Col>
        </Row>
    );
}

export default LeaderboardButtons;
