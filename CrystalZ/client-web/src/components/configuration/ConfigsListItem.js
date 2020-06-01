import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';
import { cloneConfiguration } from '../../service/configuration';
import moment from 'moment';
import DownloadButton from './DownloadButton';
import { IconOverlay } from '../OverlayTip';

/**
 * Composant ConfigsListItem :
 * Représente une configuration dans la liste des configurations
 *
 * props :
 *   - configuration : Configuration à afficher
 *   - community : Booléen à true si on se trouve dans les configs publiques
 *   - deleteConfig : Fonction de suppression d'une config (uniquement pour les configs privées)
 */
const ConfigsListItem = ({ configuration, community, deleteConfig }) => {
    const cloneConfig = configId => {
        cloneConfiguration(configId)
            .then(res => {
                history.push(`/configs/${res.data.id}/edit`);
            })
            .catch(() => toast.error('Impossible de cloner la configuration'));
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row className="justify-content-between align-items-center">
                    <Col xs="auto">
                        <Card.Title>
                            <span className="priority">
                                {!community ? (
                                    <Link
                                        className="link"
                                        to={`/configs/${configuration.id}/edit`}
                                    >
                                        {configuration.name}
                                    </Link>
                                ) : (
                                    configuration.name
                                )}
                            </span>
                            {' - '}
                            <span className="redirect">
                                {configuration.gameMode}
                            </span>
                        </Card.Title>
                        <Card.Subtitle className="subtitle">
                            Créée le{' '}
                            {moment(configuration.createdAt).format(
                                'DD/MM/YYYY'
                            )}
                            {community
                                ? configuration.Owner &&
                                  ` par ${configuration.Owner.username}`
                                : configuration.isPrivate
                                ? ', visible uniquement par moi'
                                : ', visible par la communauté'}
                        </Card.Subtitle>
                    </Col>

                    <Col xs="auto">
                        <IconOverlay tipKey="clone">
                            <FontAwesomeIcon
                                icon={faCopy}
                                size="lg"
                                className="mr-2 ml-2"
                                onClick={() => cloneConfig(configuration.id)}
                            />
                        </IconOverlay>
                        {!community && (
                            <>
                                <DownloadButton configId={configuration.id} />

                                <IconOverlay tipKey="delete">
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        size="lg"
                                        className="mr-2 ml-2 danger"
                                        onClick={() =>
                                            deleteConfig(configuration.id)
                                        }
                                    />
                                </IconOverlay>
                            </>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ConfigsListItem;
