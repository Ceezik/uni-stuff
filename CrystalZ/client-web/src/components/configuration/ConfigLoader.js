import React, { useState, useEffect, useRef } from 'react';
import { useParams, Route, Switch } from 'react-router-dom';
import { Spinner, Row, Col, Container } from 'react-bootstrap';
import PrivateRoute from '../authentification/PrivateRoute';
import TeamConfig from '../teams/TeamConfig';
import MapCreator from '../map/MapCreator';
import { getById } from '../../service/configuration';
import ConfigFormWrapper from './ConfigFormWrapper';
import Error from '../Error';
import { useAuth } from '../../utils/auth';

/**
 * Composant ConfigLoader :
 * Récupère la configuration en contexte et ajoute les PrivateRoute d'édition d'une configuration
 */
function ConfigLoader() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const { configurationId } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);
        getById(configurationId)
            .then(res => setConfig(res.data))
            .finally(() => setLoading(false));
    }, [configurationId]);

    return loading ? (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Spinner animation="border" variant="light" />
                </Col>
            </Row>
        </Container>
    ) : config ? (
        <Switch>
            {config.OwnerId === user.id && (
                <>
                    <PrivateRoute
                        exact
                        path="/configs/:configurationId/edit"
                        component={ConfigFormWrapper}
                    />
                    <PrivateRoute
                        exact
                        path="/configs/:configurationId/teams"
                        component={TeamConfig}
                    />
                    <PrivateRoute
                        exact
                        path="/configs/:configurationId/map"
                        component={MapCreator}
                    />
                </>
            )}
            <PrivateRoute
                exact
                path="/configs/:configurationId/preview"
                component={() => <MapCreator isOwner={false} />}
            />
            <Route component={Error} />
        </Switch>
    ) : (
        <Error />
    );
}

export default ConfigLoader;
