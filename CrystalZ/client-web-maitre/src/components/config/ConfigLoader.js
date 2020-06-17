import React, { useEffect, useState } from 'react';
import { useSocket } from '../../utils/useSocket';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Config from './Config';
import MapWrapper from '../map/MapWrapper';
import { useConfig } from '../../utils/useConfig';
import End from '../utils/End';

/**
 * Composant ConfigLoader :
 * Récupère la configuration et affiche la carte ou ses informations en fonction
 * de si la partie a déjà demarré ou non
 */
function ConfigLoader() {
    const { socket } = useSocket();
    const { config } = useConfig();
    const [showMap, setShowMap] = useState(true);

    useEffect(() => {
        socket.emit('getConfig');
    }, []);

    return config ? (
        config.ended ? (
            <End />
        ) : (config.launched || config.willLaunchAt) && showMap ? (
            <MapWrapper setShowMap={setShowMap} />
        ) : (
            <Config setShowMap={setShowMap} />
        )
    ) : (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Spinner animation="border" variant="light" />
                </Col>
            </Row>
        </Container>
    );
}

export default ConfigLoader;
