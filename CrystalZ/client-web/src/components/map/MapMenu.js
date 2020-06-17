import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainZoneActions from './MainZoneActions';
import ForbiddenZoneActions from './ForbiddenZoneActions';
import FlagActions from './FlagActions';
import PlayerActions from './PlayerActions';
import { useParams } from 'react-router-dom';
import ItemActions from './ItemActions';
import ConfigMenu from '../configuration/ConfigMenu';
import ResetAction from './ResetAction';

/**
 * Composant MapMenu :
 * Menu de création de la zone de jeu
 *
 * props :
 *   - action : Action en cours
 *   - setAction : Setter de la variable action
 *   - setSleepingAction : Setter d'une variable d'action dormante
 */
function MapMenu({ action, setAction, setSleepingAction }) {
    const { configurationId } = useParams();

    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col>
                    <Row className="mx-1">
                        <Col>
                            <ConfigMenu level={3} configId={configurationId} />
                        </Col>
                    </Row>

                    <ResetAction action={action} setAction={setAction} />

                    <MainZoneActions
                        action={action}
                        setAction={setAction}
                        setSleepingAction={setSleepingAction}
                    />
                    <ForbiddenZoneActions
                        action={action}
                        setAction={setAction}
                        setSleepingAction={setSleepingAction}
                    />
                    <PlayerActions />
                    <FlagActions
                        action={action}
                        setAction={setAction}
                        setSleepingAction={setSleepingAction}
                    />
                    <ItemActions
                        action={action}
                        setAction={setAction}
                        setSleepingAction={setSleepingAction}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default MapMenu;
