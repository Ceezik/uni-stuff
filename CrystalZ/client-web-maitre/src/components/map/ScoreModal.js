import React from 'react';
import _ from 'lodash';
import { Modal, Table, Row, Col, Spinner } from 'react-bootstrap';
import { useTeams } from '../../utils/useTeams';
import { useConfig } from '../../utils/useConfig';
import { secondsToDuration, areTeamEqual } from '../../utils/utils';
import { useSocket } from '../../utils/useSocket';

/**
 * Composant ScoreModal :
 * Pop-up affichant le score de chaque équipe
 *
 * props :
 *   - showScore : Si la pop-up doit être affichée ou non
 *   - setShowScore : Fonction permettant de choisir si la pop-up doit être affichée
 *                    ou non
 */
function ScoreModal({ showScore, setShowScore }) {
    return (
        <Modal show={showScore} onHide={() => setShowScore(false)} centered>
            <Modal.Body>
                <Score />
            </Modal.Body>
        </Modal>
    );
}

function Score() {
    const { config } = useConfig();
    const { socket } = useSocket();
    const { teams, setTeams } = useTeams();

    socket.on('adminRoutine', (o) => setTeams(o.teams));

    return teams && teams.length > 0 ? (
        <Table className="mb-0" borderless responsive>
            <thead>
                <tr>
                    <th>Équipe</th>
                    <th>
                        {config.gameMode === 'TIME'
                            ? 'Temps de possession'
                            : 'Cristaux capturés'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {_.orderBy(teams, ['score', 'name'], ['desc', 'asc']).map(
                    (team) => (
                        <ScoreItemMemo
                            key={team.id}
                            team={team}
                            gameMode={config.gameMode}
                        />
                    )
                )}
            </tbody>
        </Table>
    ) : (
        <Row className="justify-content-center">
            <Col xs="auto">
                <Spinner animation="border" variant="light" />
            </Col>
        </Row>
    );
}

function ScoreItem({ team, gameMode }) {
    return (
        <tr>
            <th>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <div
                            className="team-color-small"
                            style={{ backgroundColor: team.color }}
                        ></div>
                    </Col>
                    <Col xs="auto">{team.name}</Col>
                </Row>
            </th>
            <th>
                {gameMode === 'TIME'
                    ? secondsToDuration(team.score)
                    : team.score}
            </th>
        </tr>
    );
}

const ScoreItemMemo = React.memo(ScoreItem, areTeamEqual);

export default ScoreModal;
