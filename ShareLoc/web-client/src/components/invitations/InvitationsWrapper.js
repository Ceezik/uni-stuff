import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/request';
import InvitationsList from './InvitationsList';

function InvitationsWrapper() {
    const {
        loading,
        data: invitations,
        setData: setInvitations
    } = useDataFromUrl('/invitation');

    const deleteInvitations = invitationId => {
        setInvitations(invitations.filter(i => i.id !== invitationId));
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-3">Mes invitations</h1>

            {loading ? (
                <Spinner />
            ) : invitations && invitations.length > 0 ? (
                <InvitationsList
                    invitations={invitations}
                    deleteInvitations={deleteInvitations}
                />
            ) : (
                <p>Vous n'avez reçu aucune invitation.</p>
            )}
        </Container>
    );
}

export default InvitationsWrapper;
