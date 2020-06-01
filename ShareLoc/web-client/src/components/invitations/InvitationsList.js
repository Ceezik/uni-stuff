import React from 'react';
import { Row } from 'react-bootstrap';
import InvitationsListItem from './InvitationsListItem';

function InvitationsList({ invitations, deleteInvitations }) {
    return (
        <Row>
            {invitations.map(invitation => {
                return (
                    <InvitationsListItem
                        key={invitation.id}
                        invitation={invitation}
                        deleteInvitations={deleteInvitations}
                    />
                );
            })}
        </Row>
    );
}

export default InvitationsList;
