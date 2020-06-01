import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSlidersH,
    faUsers,
    faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';
import { IconOverlay } from '../OverlayTip';

/**
 * Composant ConfigMenu :
 * Menu horizontal à 3 niveaux représentant les étapes des d'une configuration (Général, Equipes, Carte de jeu)
 *
 * props :
 *   - level : Etape actuelle (1: Général, 2: Equipes, 3: Carte)
 *   - configId : Id de la configuration à éditer (inutile pour l'étape 1 si création)
 */
function ConfigMenu({ level, configId }) {
    const goTo = url => {
        if (configId) history.push(`/configs/${configId}${url}`);
    };

    const getItemClassName = lvl => {
        return `config-menu-item ${level === lvl &&
            'config-menu-item-active'} ${lvl !== 1 &&
            !configId &&
            'config-menu-item-disabled'}`;
    };

    const getSeparatorClassName = () => {
        return `config-menu-item-separator ${!configId &&
            'config-menu-item-separator-disabled'}`;
    };

    return (
        <Row className="mb-5 justify-content-between align-items-center">
            <IconOverlay tipKey="config">
                <Col
                    xs="auto"
                    className={getItemClassName(1)}
                    onClick={() => goTo('/edit')}
                >
                    <FontAwesomeIcon icon={faSlidersH} size="lg" />
                </Col>
            </IconOverlay>
            <Col className={`${getSeparatorClassName()}`}></Col>

            <IconOverlay tipKey="teams">
                <Col
                    xs="auto"
                    className={getItemClassName(2)}
                    onClick={() => goTo('/teams')}
                >
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </Col>
            </IconOverlay>

            <Col className={`${getSeparatorClassName()}`}></Col>

            <IconOverlay tipKey="map">
                <Col
                    xs="auto"
                    className={getItemClassName(3)}
                    onClick={() => goTo('/map')}
                >
                    <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
                </Col>
            </IconOverlay>
        </Row>
    );
}

export default ConfigMenu;
