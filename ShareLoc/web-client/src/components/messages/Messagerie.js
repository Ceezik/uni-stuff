import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import MessagesWrapper from './MessagesWrapper';
import { useDataFromUrl } from '../../utils/request';
import { sortColocationsByName, compareValues } from '../../utils/utils';
import moment from 'moment';

function Messagerie() {
    const { data: colocations } = useDataFromUrl('/colocation');
    const [selectedColocation, setSelectedColocation] = useState(null);

    const loadMessages = idColocation => {
        setSelectedColocation(idColocation);
    };

    const sortMessagesByDate = messages => {
        return messages.sort(compareValues('createdAt'));
    };

    const getLastMessage = colocation => {
        return sortMessagesByDate(colocation.messages)[
            colocation.messages.length - 1
        ];
    };

    useEffect(() => {
        colocations !== null &&
            setSelectedColocation(sortColocationsByName(colocations)[0].id);
    }, [colocations]);

    return (
        <>
            <Row>
                <Col xs={3} className="colocations-list">
                    <ListGroup variant="flush">
                        {' '}
                        {colocations !== null &&
                            sortColocationsByName(colocations).map(coloc => {
                                const lastMessage = getLastMessage(coloc);

                                return (
                                    <ListGroup.Item
                                        key={coloc.id}
                                        className="colocation-item"
                                        active={selectedColocation === coloc.id}
                                        variant={
                                            coloc.id === selectedColocation &&
                                            'secondary'
                                        }
                                        onClick={() => loadMessages(coloc.id)}
                                    >
                                        <Row className="colocation-name align-items-center">
                                            <Col>{coloc.name}</Col>
                                            <Col
                                                xs="auto"
                                                className="last-message"
                                            >
                                                {lastMessage &&
                                                    moment(
                                                        lastMessage.createdAt,
                                                        'yyyy-MM-DDThh:mm:ssZ[UTC]'
                                                    ).format('D/MM/YYYY')}
                                            </Col>
                                        </Row>
                                        <Row className="last-message">
                                            <Col>
                                                {lastMessage
                                                    ? lastMessage.message
                                                    : 'Soyez le premier à envoyer un message'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                );
                            })}{' '}
                    </ListGroup>
                </Col>
                <Col xs={9} className="messagerie">
                    {selectedColocation !== null && (
                        <MessagesWrapper idColocation={selectedColocation} />
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Messagerie;
