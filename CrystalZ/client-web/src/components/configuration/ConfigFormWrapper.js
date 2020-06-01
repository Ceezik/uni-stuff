import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Spinner, Container } from 'react-bootstrap';
import { getById } from '../../service/configuration';
import ConfigForm from './ConfigForm';

/**
 * Composant ConfigFormWrapper :
 * Composant récupérant la configuration en contexte et affiche ConfigForm dès la récupération
 */
function ConfigFormWrapper() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const { configurationId } = useParams();

    useEffect(() => {
        if (configurationId) {
            getById(configurationId)
                .then(res => setConfig(res.data))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    return loading ? (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Spinner animation="border" variant="light" />
                </Col>
            </Row>
        </Container>
    ) : (
        <ConfigForm config={config} />
    );
}

export default ConfigFormWrapper;
