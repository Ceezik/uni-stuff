import React from 'react';
import { Card, Row, Col, Accordion, Spinner } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { removeTeam } from '../../service/configuration';
import AddMember from './AddMember';
import TeamMembers from './TeamMembers';
import { toast } from 'react-toastify';
import { IconOverlay } from '../OverlayTip';

/**
 * Composant TeamConfigItem :
 * Formulaire de gestion d'une équipe
 *
 * props :
 *   - configurationId : Id de la configuration en cours d'édition
 *   - setIsOpen : Setter du booleen permettant de savoir si l'édition est en cours
 *   - team : Equipe en cours d'édition
 *   - teams : Liste des équipes de la configuration
 *   - setTeams : setter de la variable teams
 */
const TeamConfigItem = ({
    configurationId,
    setIsOpen,
    team,
    teams,
    setTeams
}) => {
    const { loading, data: members, setData: setMembers } = useDataFromUrl(
        `/configs/${configurationId}/teams/${team.id}/users`
    );

    const deleteTeam = () => {
        removeTeam(configurationId, team.id)
            .then(() => setTeams(teams.filter(t => t.id !== team.id)))
            .catch(() => toast.error('Une erreur est survenue'));
    };

    return (
        <Accordion className="mt-4">
            <Accordion.Toggle as={Card}>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <div
                                className="div-color"
                                style={{ backgroundColor: team.color }}
                            ></div>
                        </Col>
                        <Col>
                            <Row className="justify-content-between align-items-center">
                                <Col xs="auto">
                                    <Card.Title className="mb-0">
                                        {team.name}
                                    </Card.Title>
                                </Col>
                                <Col xs="auto">
                                    <Row>
                                        <IconOverlay tipKey="modify">
                                            <Col xs="auto">
                                                <FontAwesomeIcon
                                                    icon={faPencilAlt}
                                                    size="lg"
                                                    onClick={() =>
                                                        setIsOpen(true)
                                                    }
                                                />
                                            </Col>
                                        </IconOverlay>
                                        <IconOverlay tipKey="delete">
                                            <Col xs="auto">
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    className="danger"
                                                    size="lg"
                                                    onClick={() => deleteTeam()}
                                                />
                                            </Col>
                                        </IconOverlay>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Accordion.Toggle>
            <Accordion.Collapse className="mt-2">
                <>
                    <AddMember
                        configurationId={configurationId}
                        teamId={team.id}
                        members={members}
                        setMembers={setMembers}
                    />
                    {loading ? (
                        <Row className="mt-3 justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : (
                        members.map(member => (
                            <TeamMembers
                                key={member.id}
                                configurationId={configurationId}
                                teamId={team.id}
                                member={member}
                                members={members}
                                setMembers={setMembers}
                            />
                        ))
                    )}
                </>
            </Accordion.Collapse>
        </Accordion>
    );
};

export default TeamConfigItem;
