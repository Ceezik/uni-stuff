import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Composant Error :
 * Page d'erreur 404
 */
function Error() {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Alert variant="danger">
                        <h2>Une erreur est survenue 😓</h2>
                        <p>
                            Vous avez essayé d'accéder à une page qui n'existe
                            pas. Cliquez{' '}
                            <Link to="/configs" className="underline">
                                ici
                            </Link>{' '}
                            pour être ramené à la maison.
                        </p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default Error;
