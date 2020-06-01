import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { _delete } from '../../services/message';

function MessageButtons({
    message,
    setEdited,
    setDefaultMessage,
    deleteMessage,
    idColocation
}) {
    const editMessage = () => {
        setDefaultMessage(message);
        setEdited(true);
    };

    const delMessage = () => {
        const idMessage = message.id;
        _delete(idColocation, idMessage).then(deleteMessage(idMessage));
    };

    return (
        <div className="mb-2 btn-edit">
            <Row>
                <Col xs="auto">
                    <FontAwesomeIcon
                        icon={faPencilAlt}
                        onClick={() => editMessage()}
                        color="#6c757d"
                    />
                </Col>
                <Col xs="auto">
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => delMessage()}
                        color="#dc3545"
                    />
                </Col>
            </Row>
        </div>
    );
}

export default MessageButtons;
