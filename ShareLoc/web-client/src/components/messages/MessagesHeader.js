import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function MessagesHeader({ colocation }) {
    return (
        <Row className="messages-header align-items-center">
            <Col xs="auto">
                <Link to={`/colocations/${colocation.id}`}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size="lg"
                        color="#6c757d"
                    />
                </Link>
            </Col>
            <Col>
                <h4 className="mb-0">{colocation.name}</h4>
            </Col>
        </Row>
    );
}

export default MessagesHeader;
