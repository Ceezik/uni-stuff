import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

/**
 * Composant Disconnected :
 * Affiche une message d'erreur si l'application n'arrive pas à communiquer avec
 * le serveur de jeu
 */
function Disconnected() {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Alert variant="danger">
                        <h2>Une erreur est survenue 😓</h2>
                        <p className="mt-3 mb-0">
                            Il est actuellement impossible de communiquer avec
                            le serveur de jeu.
                            <br />
                            Vous pouvez essayer de rouvrir votre navigateur et
                            de vérifier que le serveur de jeu est encore en
                            route.
                        </p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default Disconnected;
