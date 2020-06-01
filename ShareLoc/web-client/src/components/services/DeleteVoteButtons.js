import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/auth';
import VoteButtons from './VoteButtons';

function DeleteVoteButtons({ service, refreshServices }) {
    const { user } = useAuth();
    const [deleteVote, setDeleteVote] = useState(false);

    const userVote = service.deleteVotes.filter(
        v => v.user.login === user.login
    );
    const nbAgree = service.deleteVotes.filter(v => v.agree === true).length;
    const nbDisagree = service.deleteVotes.filter(v => v.agree === false)
        .length;

    return (
        <>
            {service.deleteVotes.length === 0 && !deleteVote ? (
                <Button
                    variant="outline-danger"
                    type="submit"
                    onClick={() => setDeleteVote(true)}
                >
                    Demander la suppression
                </Button>
            ) : (
                <>
                    <strong> Supprimer ? </strong>
                    <VoteButtons
                        type="deleteService"
                        serviceId={service.id}
                        userVote={userVote}
                        nbAgree={nbAgree}
                        nbDisagree={nbDisagree}
                        refreshServices={refreshServices}
                    />
                </>
            )}
        </>
    );
}

export default DeleteVoteButtons;
