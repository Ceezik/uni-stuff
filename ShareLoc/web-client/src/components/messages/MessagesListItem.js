import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/fr';
import { useAuth } from '../../utils/auth';
import MessageButtons from './MessageButtons';

function MessagesListItem({
    message,
    setEdited,
    setDefaultMessage,
    deleteMessage,
    idColocation
}) {
    moment.locale('fr');
    const { user } = useAuth();

    return (
        <div className="mb-2 message-item">
            <Row>
                <Col xs="auto">
                    <strong>
                        {message.auteur.firstname} {message.auteur.lastname}
                    </strong>
                </Col>
                <Col xs="auto"></Col>
                <Col xs="auto">
                    <span className="text-muted">
                        {moment(message.createdAt, 'yyyy-MM-DDThh:mm:ssZ[UTC]').calendar()}
                    </span>
                    <span className="text-muted">
                        {message.updatedAt !== undefined &&
                            ` (modifié  ${moment().to(
                                moment(message.updatedAt, 'yyyy-MM-DDThh:mm:ssZ[UTC]')
                            )})`}{' '}
                    </span>
                </Col>
                {user.login === message.auteur.login ? (
                    <MessageButtons
                        message={message}
                        setEdited={setEdited}
                        setDefaultMessage={setDefaultMessage}
                        deleteMessage={deleteMessage}
                        idColocation={idColocation}
                    />
                ) : (
                    ''
                )}
            </Row>
            <Row>
                <Col>{message.message}</Col>
            </Row>
        </div>
    );
}

export default MessagesListItem;
