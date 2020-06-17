import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Button, Container, Spinner } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import TeamConfigItem from './TeamConfigItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ConfigMenu from '../configuration/ConfigMenu';
import CreateTeam from './CreateTeam';
import { IconOverlay } from '../OverlayTip';

/**
 * Composant TeamConfig :
 * Formulaire de gestion des équipes
 */
const TeamConfig = () => {
    const { configurationId } = useParams();

    const { loading: loading, data: teams, setData: setTeams } = useDataFromUrl(
        `/configs/${configurationId}/teams`
    );

    const [create, setCreate] = useState(false);
    const [update, setUdpdate] = useState(false);
    const [updatedTeam, setUdpdatedTeam] = useState(null);

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <ConfigMenu level={2} configId={configurationId} />

                    <h3 className="mb-5">Gestion des équipes</h3>

                    {create || update ? (
                        <CreateTeam
                            configurationId={configurationId}
                            team={updatedTeam}
                            setIsOpen={
                                create
                                    ? setCreate
                                    : e => {
                                          setUdpdate(e);
                                          setUdpdatedTeam(null);
                                      }
                            }
                            teams={teams}
                            setTeams={setTeams}
                        />
                    ) : (
                        <>
                            <Card onClick={() => setCreate(true)}>
                                <Card.Body>
                                    <Row className="align-items-center">
                                        <Col xs="auto">
                                            <div
                                                className="div-color"
                                                style={{
                                                    backgroundColor: '#26292f'
                                                }}
                                            >
                                                <IconOverlay tipKey="addTeam">
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        size="lg"
                                                    />
                                                </IconOverlay>
                                            </div>
                                        </Col>
                                        <Col>
                                            <Card.Title className="mb-0">
                                                <span>Créer une équipe</span>
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {loading ? (
                                <Row className="mt-3 justify-content-center">
                                    <Col xs="auto">
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                        />
                                    </Col>
                                </Row>
                            ) : (
                                teams !== null &&
                                teams.map(team => (
                                    <TeamConfigItem
                                        key={team.id}
                                        configurationId={configurationId}
                                        setIsOpen={e => {
                                            setUdpdatedTeam(team);
                                            setUdpdate(e);
                                        }}
                                        team={team}
                                        teams={teams}
                                        setTeams={setTeams}
                                    />
                                ))
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TeamConfig;
