import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDataFromUrl } from '../../utils/request';
import Spinner from 'react-bootstrap/Spinner';
import MessagesHeader from './MessagesHeader';
import MessagesList from './MessagesList';
import { Container } from 'react-bootstrap';
import { compareValues } from '../../utils/utils';

function MessagesWrapper(coloc = null) {
    const { colocationId } = useParams();
    const idColoc = colocationId || coloc.idColocation;
    const { loading, error, data: colocation } = useDataFromUrl(
        `/colocation/${idColoc}`
    );
    const [messages, setMessages] = useState([]);

    const addMessage = message => {
        setMessages([...messages, message]);
    };

    const editMessage = message => {
        setMessages([...messages.filter(m => m.id !== message.id), message]);
    };

    const deleteMessage = messageId => {
        setMessages(messages.filter(m => m.id !== messageId));
    };

    const sortMessagesByDate = messages => {
        return messages.sort(compareValues('createdAt'));
    };

    useEffect(() => {
        colocation !== null && setMessages(colocation.messages);
    }, [colocation]);

    return loading ? (
        <Spinner />
    ) : error ? (
        <p>Impossible de charger les messages de la colocation.</p>
    ) : (
        <Container fluid>
            <MessagesHeader colocation={colocation} />
            <MessagesList
                messages={sortMessagesByDate(messages)}
                addMessage={addMessage}
                editMessage={editMessage}
                deleteMessage={deleteMessage}
                idColocation={idColoc}
            />
        </Container>
    );
}

export default MessagesWrapper;
