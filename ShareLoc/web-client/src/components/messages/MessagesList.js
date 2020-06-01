import React, { useEffect, useState } from 'react';
import MessagesListItem from './MessagesListItem';
import MessageFooter from './MessagesFooter';

function MessagesList({
    messages,
    addMessage,
    editMessage,
    deleteMessage,
    idColocation
}) {
    const [edited, setEdited] = useState(false);
    const [defaultMessage, setDefaultMessage] = useState('');

    useEffect(() => {
        const divToScrollTo = document.getElementById('bottom_messages');
        divToScrollTo.scrollIntoView();
    }, [messages]);

    return (
        <>
            <div className="messages-body">
                {messages.length > 0 ? (
                    messages.map(message => {
                        return (
                            <MessagesListItem
                                key={message.id}
                                message={message}
                                setEdited={setEdited}
                                setDefaultMessage={setDefaultMessage}
                                deleteMessage={deleteMessage}
                                idColocation={idColocation}
                            />
                        );
                    })
                ) : (
                    <p>Aucun message à afficher</p>
                )}
                <span id="bottom_messages"></span>
            </div>

            <MessageFooter
                addMessage={addMessage}
                edited={edited}
                defaultMessage={defaultMessage}
                setEdited={setEdited}
                setDefaultMessage={setDefaultMessage}
                editMessage={editMessage}
                idColocation={idColocation}
            />
        </>
    );
}

export default MessagesList;
