import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useGameAreas } from '../../utils/useGameAreas';
import { useAction } from '../../utils/useAction';

/**
 * Composant GameAreaActions :
 * Différentes actions réalisables sur la zone de jeu
 */
function GameAreaActions() {
    const iconGameArea = require('../../icons/gameArea.png');
    const { deleteGameAreas } = useGameAreas();
    const { action, setAction } = useAction();

    const handleAction = () => {
        setAction(action === 'gameArea' ? null : 'gameArea');
    };

    return (
        <Row className="mt-3 ml-1">
            <Col
                xs="auto"
                className={`mb-3 mr-3 actions-item ${
                    action === 'gameArea' && 'actions-item-selected'
                }`}
                onClick={handleAction}
            >
                <Image className="actions-item-img" src={iconGameArea} />
            </Col>
            <Col
                xs="auto"
                className="mb-3 actions-item"
                onClick={deleteGameAreas}
            >
                <FontAwesomeIcon icon={faTrashAlt} className="danger" />
            </Col>
        </Row>
    );
}

export default GameAreaActions;
