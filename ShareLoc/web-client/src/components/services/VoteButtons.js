import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import {
    _createVoteService,
    _createVoteAchievedService,
    _createVoteDeleteService
} from '../../services/vote';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function VoteButtons({
    type,
    serviceId,
    nbAgree,
    nbDisagree,
    userVote,
    refreshServices
}) {
    const [agree, setAgree] = useState(nbAgree);
    const [disagree, setDisagree] = useState(nbDisagree);
    const [vote, setVote] = useState(userVote[0]);
    const { colocationId } = useParams();

    const hasVoted = vote != null;

    const voteService = voteUser => {
        _createVoteService(colocationId, serviceId, voteUser)
            .then(() => {
                setVote(voteUser);
                voteUser.agree
                    ? setAgree(agree + 1)
                    : setDisagree(disagree + 1);
            })
            .then(() => refreshServices())
            .catch(() => toast.error("Impossible d'ajouter le vote."));
    };

    const voteAchievedService = voteUser => {
        _createVoteAchievedService(colocationId, serviceId, voteUser)
            .then(() => {
                setVote(voteUser);
                voteUser.agree
                    ? setAgree(agree + 1)
                    : setDisagree(disagree + 1);
            })
            .then(() => refreshServices())
            .catch(() => toast.error("Impossible d'ajouter le vote."));
    };

    const voteDeleteService = voteUser => {
        _createVoteDeleteService(colocationId, serviceId, voteUser)
            .then(() => {
                setVote(voteUser);
                voteUser.agree
                    ? setAgree(agree + 1)
                    : setDisagree(disagree + 1);
            })
            .then(() => refreshServices())
            .catch(() => toast.error("Impossible d'ajouter le vote."));
    };

    const handleClick = voteUser => {
        type === 'service'
            ? voteService(voteUser)
            : type === 'achievedService'
            ? voteAchievedService(voteUser)
            : type === 'deleteService' && voteDeleteService(voteUser);
    };

    return (
        <>
            <Button
                disabled={hasVoted}
                variant="vote"
                type="submit"
                onClick={() => handleClick({ agree: true })}
            >
                <Row>
                    <Col xs={12}>
                        <FontAwesomeIcon
                            className={
                                !hasVoted || vote.agree
                                    ? 'agree vote-button'
                                    : 'vote-button'
                            }
                            icon={faThumbsUp}
                            size="lg"
                        />
                    </Col>
                    <Col xs={12}>{hasVoted && agree}</Col>
                </Row>
            </Button>
            <Button
                disabled={hasVoted}
                variant="vote"
                type="submit"
                onClick={() => handleClick({ agree: false })}
            >
                <Row>
                    <Col xs={12}>
                        <FontAwesomeIcon
                            className={
                                !hasVoted || !vote.agree
                                    ? 'disagree vote-button'
                                    : 'vote-button'
                            }
                            icon={faThumbsDown}
                            size="lg"
                        />
                    </Col>
                    <Col xs={12}>{hasVoted && disagree}</Col>
                </Row>
            </Button>
        </>
    );
}

export default VoteButtons;
