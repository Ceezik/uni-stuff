import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getByIdWithStats } from '../../service/user';
import Error from '../Error';
import Statistics from './Statistics';

/**
 * Composant ProfilWrrapper :
 * Récupère le profil d'un utilisateur ainsi que ses statistiques
 */
function ProfilWrapper() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();

    useEffect(() => {
        getByIdWithStats(userId)
            .then(res => setUser(res.data))
            .finally(() => setLoading(false));
    }, [userId]);

    return loading ? (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Spinner animation="border" variant="light" />
                </Col>
            </Row>
        </Container>
    ) : user ? (
        <Container className="my-5">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Statistics user={user} />
                </Col>
            </Row>
        </Container>
    ) : (
        <Error />
    );
}

export default ProfilWrapper;
