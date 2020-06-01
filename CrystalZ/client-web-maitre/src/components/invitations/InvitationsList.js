import React, { useEffect, useState } from 'react';
import { useSocket } from '../../utils/useSocket';
import InvitationsListItem from './InvitationsListItem';

/**
 * Composant InvitationsList :
 * Affiche la liste des demandes à rejoindre la partie
 */
function InvitationsList() {
    const { socket } = useSocket();
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        socket.on('getInvitations', (i) => setInvitations(i));
        socket.emit('getInvitations');
    }, []);

    return invitations.length > 0 ? (
        invitations.map((invitation) => (
            <InvitationsListItem key={invitation.id} invitation={invitation} />
        ))
    ) : (
        <p>Aucun joueur n'a envoyé de demande pour rejoindre votre partie.</p>
    );
}

export default InvitationsList;
