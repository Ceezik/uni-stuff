import React, { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import MainZoneActions from './MainZoneActions';
import ForbiddenZoneActions from './ForbiddenZoneActions';
import FlagActions from './FlagActions';
import PlayerActions from './PlayerActions';
import { useParams } from 'react-router-dom';
import { updateConfig } from '../../utils/config';
import { useMainZone } from '../../utils/useMainZone';
import { useForbiddenZone } from '../../utils/useForbiddenZone';
import { useFlag } from '../../utils/useFlag';
import ItemActions from './ItemActions';
import { useItem } from '../../utils/useItem';
import { toast } from 'react-toastify';
import ConfigMenu from '../configuration/ConfigMenu';

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
    const [loading, setLoading] = useState(false);
    const { configurationId } = useParams();
    const { position: mainZone } = useMainZone();
    const { forbiddenZones } = useForbiddenZone();
    const { flagsPositions } = useFlag();
    const { items } = useItem();

    const saveMap = () => {
        if (mainZone.length === 0) {
            toast.error(
                "Veuillez créer une zone de jeu avant d'enregistrer la carte"
            );
        } else {
            setLoading(true);
            updateConfig(
                configurationId,
                mainZone,
                forbiddenZones,
                flagsPositions,
                items
            )
                .then(() => toast.success('Configuration enregistrée'))
                .catch(() => toast.error('Une erreur est survenue'))
                .finally(() => setLoading(false));
        }
    };

    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col>
                    <Row className="mx-1">
                        <Col>
                            <ConfigMenu level={3} configId={configurationId} />
                        </Col>
                    </Row>

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
            <Row className="mt-4 justify-content-end">
                <Col xs="auto">
                    <Button
                        variant="success"
                        className="btn-primary"
                        disabled={loading}
                        onClick={() => !loading && saveMap()}
                    >
                        {loading ? 'Enregistrement ...' : 'Enregistrer'}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default MapMenu;
