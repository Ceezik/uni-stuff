import React, { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import LeaderboardList from './LeaderboardList';
import LeaderboardButtons from './LeaderboardButtons';

/**
 * Composant LeaderboardWrapper :
 * Récupère le classement des meilleurs joueurs
 */
function LeaderboardWrapper() {
    const [filter, setFilter] = useState('SUPREMACY');
    const { loading, error, data: players } = useDataFromUrl(
        `/leaderboard?filter=${filter}`
    );

    return (
        <Container className="my-5">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <LeaderboardButtons filter={filter} setFilter={setFilter} />

                    {loading ? (
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : error ? (
                        <p>Une erreur est survenue.</p>
                    ) : (
                        <LeaderboardList players={players} filter={filter} />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default LeaderboardWrapper;
