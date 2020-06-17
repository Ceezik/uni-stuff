import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMainZone } from '../../utils/useMainZone';
import {
    faTrashAlt,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { IconOverlay } from '../OverlayTip';

/**
 * Composant MainZoneActions :
 * Menu des actions réalisables sur la zone de jeu
 *
 * props :
 *   - action : Action en cours
 *   - setAction : Setter de la variable action
 *   - setSleepingAction : Setter d'une variable d'action dormante
 */
function MainZoneActions({ action, setAction, setSleepingAction }) {
    const { removeAll } = useMainZone();
    const [isOpen, setIsOpen] = useState(false);
    const iconGameArea = require('../../img/gameArea.png');

    const handleAction = () => {
        if (action === 'showPopup') setSleepingAction('mainZone');
        else if (action === 'mainZone') setAction(null);
        else setAction('mainZone');
    };

    return (
        <>
            <Row
                className="ml-1 mr-1 justify-content-between align-items-center pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4>Zone de jeu</h4>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </Row>
            {isOpen && (
                <Row className="mt-3 ml-1">
                    <IconOverlay tipKey="area">
                        <Col
                            xs="auto"
                            className={`mb-3 mr-3 actions-item ${action ===
                                'mainZone' && 'actions-item-selected'}`}
                            onClick={handleAction}
                        >
                            <Image
                                style={{ maxWidth: '25px', maxHeight: '25px' }}
                                src={iconGameArea}
                            />
                        </Col>
                    </IconOverlay>
                    <IconOverlay tipKey="delete">
                        <Col
                            xs="auto"
                            className="mb-3 actions-item"
                            onClick={removeAll}
                        >
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="danger"
                            />
                        </Col>
                    </IconOverlay>
                </Row>
            )}
        </>
    );
}

export default MainZoneActions;
