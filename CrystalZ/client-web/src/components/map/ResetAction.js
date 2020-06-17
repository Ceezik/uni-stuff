import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * Composant ResetAction :
 * Permet de ne choisir aucune action
 *
 * props :
 *   - action : Action en cours
 *   - setAction : Setter de la variable action
 */
function ResetAction({ action, setAction }) {
    return (
        <Row className="mt-3 ml-1">
            <Col
                xs="auto"
                className={`mb-3 mr-3 actions-item ${!action &&
                    'actions-item-selected'}`}
                onClick={() => setAction(null)}
            >
                <FontAwesomeIcon icon={faArrowsAlt} />
            </Col>
        </Row>
    );
}

export default ResetAction;
