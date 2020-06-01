import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTrashAlt,
    faChevronUp,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useForbiddenZone } from '../../utils/useForbiddenZone';
import { IconOverlay } from '../OverlayTip';

/**
 * Composant ForbiddenZoneActions :
 * Menu des actions réalisables sur les zones interdites
 *
 * props :
 *   - action : Action en cours
 *   - setAction : Setter de la variable action
 *   - setSleepingAction : Setter d'une variable d'action dormante
 */
function ForbiddenZoneActions({ action, setAction, setSleepingAction }) {
    const { forbiddenZones, createZone, removeAll } = useForbiddenZone();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Row
                className="mt-2 ml-1 mr-1 justify-content-between align-items-center pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4>Zones interdites</h4>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </Row>

            {isOpen && (
                <>
                    <Row className="mt-3 ml-1">
                        <Col
                            xs="auto"
                            className="mr-3 actions-item"
                            onClick={() => {
                                action === 'showPopup'
                                    ? setSleepingAction('forbiddenZone')
                                    : setAction('forbiddenZone');
                                createZone();
                            }}
                        >
                            <IconOverlay tipKey="addForbiddenArea">
                                <FontAwesomeIcon icon={faPlus} />
                            </IconOverlay>
                        </Col>
                        <IconOverlay tipKey="delete">
                            <Col
                                xs="auto"
                                className={`mr-3 actions-item`}
                                onClick={() => removeAll()}
                            >
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className="danger"
                                />
                            </Col>
                        </IconOverlay>
                    </Row>

                    <Row className="mt-2 ml-1">
                        {forbiddenZones.map((f, index) => (
                            <ForbiddenZoneItem
                                action={action}
                                setAction={setAction}
                                zone={f}
                                key={index}
                            />
                        ))}
                    </Row>
                </>
            )}
        </>
    );
}

function ForbiddenZoneItem({ action, setAction, zone }) {
    const {
        forbiddenZones,
        forbiddenZoneIndex,
        setForbiddenZoneIndex,
        removeZone
    } = useForbiddenZone();
    const iconForbiddenArea = require('../../img/forbiddenArea.png');
    const index = forbiddenZones.indexOf(zone);

    return (
        <Col xs={12} className="mt-1">
            <h5>{`Zone interdite n°${index + 1}`}</h5>

            <Row className="mt-1 ml-1">
                <IconOverlay tipKey="forbiddenArea">
                    <Col
                        xs="auto"
                        className={`mb-3 mr-3 actions-item ${action ===
                            'forbiddenZone' &&
                            index === forbiddenZoneIndex &&
                            'actions-item-selected'}`}
                        onClick={() => {
                            setAction('forbiddenZone');
                            setForbiddenZoneIndex(index);
                        }}
                    >
                        <Image
                            style={{ maxWidth: '25px', maxHeight: '25px' }}
                            src={iconForbiddenArea}
                        />
                    </Col>
                </IconOverlay>
                <IconOverlay tipKey="delete">
                    <Col
                        xs="auto"
                        className={`mb-3 mr-3 actions-item`}
                        onClick={() => removeZone(index)}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                    </Col>
                </IconOverlay>
            </Row>
        </Col>
    );
}

export default ForbiddenZoneActions;
