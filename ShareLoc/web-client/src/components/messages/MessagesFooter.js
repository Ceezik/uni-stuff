import React from 'react';
import Row from 'react-bootstrap/Row';
import AddMessageForm from './AddMessageForm';

function MessagesFooter({
    addMessage,
    edited,
    setEdited,
    defaultMessage,
    setDefaultMessage,
    editMessage,
    idColocation
}) {
    return (
        <Row className="messages-footer">
            <AddMessageForm
                addMessage={addMessage}
                edited={edited}
                defaultMessage={defaultMessage}
                setEdited={setEdited}
                setDefaultMessage={setDefaultMessage}
                editMessage={editMessage}
                idColocation={idColocation}
            />
        </Row>
    );
}

export default MessagesFooter;
