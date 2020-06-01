import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import { useParams } from 'react-router-dom';
import Game from './Game';

/**
 * Composant GameWrapper :
 * Récupère le score de tous les joueurs d'une partie
 */
function GameWrapper() {
    const { gameId } = useParams();
    const { loading, error, data: histories } = useDataFromUrl(
        `/games/${gameId}/history`
    );

    return (
        <Container className="my-5">
            <Row>
                <Col xs={12}>
                    {loading ? (
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : error ? (
                        <p>Une erreur est survenue.</p>
                    ) : (
                        <Game histories={histories} />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default GameWrapper;
