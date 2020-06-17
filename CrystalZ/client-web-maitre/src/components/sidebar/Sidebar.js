import React, { useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useConfig } from '../../utils/useConfig';
import { useSocket } from '../../utils/useSocket';
import GameAreaActions from './GameAreaActions';
import Collapsable from './Collapsable';
import ForbiddenAreaActions from './ForbiddenAreaActions';
import PlayerActions from './PlayerActions';
import FlagActions from './FlagActions';
import ItemActions from './ItemActions';
import ResetAction from './ResetAction';

/**
 * Composant Sidebar :
 * Menu latéral
 */
function Sidebar() {
    const { config } = useConfig();
    const { socket } = useSocket();

    useEffect(() => {
        socket.emit('getItemModels');
    }, []);

    const endGame = () => socket.emit('endGame');

    return (
        <Container className="py-3">
            <h3 className="mb-5 text-center">
                {`${config.name} - ${config.gameMode}`}
            </h3>

            <ResetAction />

            <Collapsable title="Zone de jeu" defaultOpen={false}>
                <GameAreaActions />
            </Collapsable>

            <Collapsable title="Zones interdites" defaultOpen={false}>
                <ForbiddenAreaActions />
            </Collapsable>

            <Collapsable title="Joueurs" defaultOpen={false}>
                <PlayerActions />
            </Collapsable>

            <Collapsable title="Cristaux" defaultOpen={false}>
                <FlagActions />
            </Collapsable>

            <Collapsable title="Items" defaultOpen={false}>
                <ItemActions />
            </Collapsable>

            <Row className="mt-5 justify-content-end">
                <Col xs="auto">
                    <Button variant="danger" onClick={endGame}>
                        Terminer la partie
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Sidebar;
