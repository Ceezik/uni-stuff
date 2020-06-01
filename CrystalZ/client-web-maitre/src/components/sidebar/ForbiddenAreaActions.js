import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useForbiddenAreas } from '../../utils/useForbiddenAreas';
import { useAction } from '../../utils/useAction';

/**
 * Composant ForbiddenAreaActions :
 * Différentes actions réalisables sur les zones interdites
 */
function ForbiddenAreaActions() {
    const {
        forbiddenAreas,
        createForbiddenArea,
        deleteForbiddenAreas,
    } = useForbiddenAreas();
    const { setAction } = useAction();

    return (
        <>
            <Row className="mt-3 ml-1">
                <Col
                    xs="auto"
                    className="mr-3 mb-3 actions-item"
                    onClick={() => {
                        createForbiddenArea();
                        setAction('forbiddenArea');
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Col>
                <Col
                    xs="auto"
                    className="mb-3 actions-item"
                    onClick={deleteForbiddenAreas}
                >
                    <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                </Col>
            </Row>

            <Row className="mt-2 ml-1">
                {forbiddenAreas.map((a) => (
                    <ForbiddenAreaItem area={a} key={a.id} />
                ))}
            </Row>
        </>
    );
}

function ForbiddenAreaItem({ area }) {
    const {
        forbiddenAreas,
        deleteForbiddenArea,
        forbiddenAreaIndex,
        setForbiddenAreaIndex,
    } = useForbiddenAreas();
    const { action, setAction } = useAction();
    const iconForbiddenArea = require('../../icons/forbiddenArea.png');
    const index = forbiddenAreas.indexOf(area);

    return (
        <Col xs={12}>
            <h5>{`Zone interdite n°${index + 1}`}</h5>

            <Row className="mt-1 ml-1">
                <Col
                    xs="auto"
                    className={`mb-3 mr-3 actions-item ${
                        action === 'forbiddenArea' &&
                        index === forbiddenAreaIndex &&
                        'actions-item-selected'
                    }`}
                    onClick={() => {
                        setAction('forbiddenArea');
                        setForbiddenAreaIndex(index);
                    }}
                >
                    <Image
                        className="actions-item-img"
                        src={iconForbiddenArea}
                    />
                </Col>
                <Col
                    xs="auto"
                    className={`mb-3 mr-3 actions-item`}
                    onClick={() => deleteForbiddenArea(area.id)}
                >
                    <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                </Col>
            </Row>
        </Col>
    );
}

export default ForbiddenAreaActions;
