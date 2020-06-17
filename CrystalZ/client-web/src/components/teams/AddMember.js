import React, { useState, useRef } from 'react';
import { Card, Row, Col, Alert } from 'react-bootstrap';
import { getUsers, addMember } from '../../service/configuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { IconOverlay } from '../OverlayTip';

/**
 * Composant AddMember :
 * Input d'ajout d'un membre dans une équipe
 *
 * props :
 *   - configurationId : Id de la configuration en cours d'édition
 *   - teamId : Id de l'équipe en cours d'édition
 *   - members : Membres de l'équipe
 *   - setMembers : setter de la variable members
 */
const AddMember = ({ configurationId, teamId, members, setMembers }) => {
    const [name, setName] = useState('');
    const [member, setMember] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const typeahead = useRef();

    const _addMember = () => {
        if (name) {
            addMember(configurationId, teamId, name)
                .then(res => {
                    setError('');
                    typeahead.current.getInstance().clear();
                    setMembers([...members, res.data]);
                })
                .catch(err => {
                    const code = err.response.status;

                    if (code === 409)
                        setError(
                            "Cet utilisateur fait déjà partie d'une équipe"
                        );
                    else if (code === 404)
                        setError("Cet utilisateur n'existe pas");
                    else if (code === 400) setError('Cette équipe est pleine');
                    else setError('Une erreur est survenue');
                });
        } else {
            setError('Veuillez choisir un utilisateur');
        }
    };

    const handleSearch = username => {
        setLoading(true);
        getUsers(username)
            .then(res => setMember(res.data))
            .finally(() => setLoading(false));
    };

    return (
        <Card>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Row className="align-items-center">
                    <Col>
                        <AsyncTypeahead
                            id="concerned_member_typehead"
                            value={name}
                            onChange={e =>
                                e.length > 0 && setName(e[0].username)
                            }
                            ref={typeahead}
                            labelKey="username"
                            allowNew={false}
                            multiple={false}
                            minLength={2}
                            maxResults={5}
                            onSearch={handleSearch}
                            placeholder="Sélectionnez un membre à ajouter"
                            isLoading={loading}
                            options={member}
                            renderMenuItemChildren={option => (
                                <span key={option.id}>{option.username}</span>
                            )}
                        />
                    </Col>
                    <Col xs="auto" onClick={_addMember}>
                        <IconOverlay tipKey="addMember">
                            <FontAwesomeIcon icon={faPlus} />
                        </IconOverlay>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AddMember;
