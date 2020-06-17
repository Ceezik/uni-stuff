import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { useAction } from '../../utils/useAction';

/**
 * Composant ResetAction :
 * Permet de ne choisir aucune action
 */
function ResetAction() {
    const { action, setAction } = useAction();

    return (
        <Row className="mt-3 ml-1">
            <Col
                xs="auto"
                className={`mb-3 mr-3 actions-item ${
                    !action && 'actions-item-selected'
                }`}
                onClick={() => setAction(null)}
            >
                <FontAwesomeIcon icon={faArrowsAlt} />
            </Col>
        </Row>
    );
}

export default ResetAction;
