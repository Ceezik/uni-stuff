import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
    exportConfiguration,
    getById,
    getAreas,
    updateById,
    getItemsModel,
    updateItemsModel,
    updateItem,
    getItems,
    getTeams
} from '../../service/configuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { getVisibilityRadiusAuto, formatZone } from '../../utils/utils';
import { IconOverlay } from '../OverlayTip';
import { Modal, Button } from 'react-bootstrap';

/**
 * Composant DownloadButton :
 * Bouton permettant de télécharger le serveur de jeu avec une config créée
 *
 * props :
 *   - configId : Id de la configuration à télécharger
 */
function DownloadButton({ configId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <IconOverlay tipKey="download">
                <FontAwesomeIcon
                    icon={faDownload}
                    size="lg"
                    onClick={() => setShowModal(true)}
                    className="mr-2 ml-2"
                />
            </IconOverlay>

            <DownloadModal
                configId={configId}
                showModal={showModal}
                handleClose={() => setShowModal(false)}
            />
        </>
    );
}

function DownloadModal({ configId, showModal, handleClose }) {
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('rapide');

    const configRadius = (config, zone) => {
        const newConfig = { id: config.id };
        if (!config.playerVisibilityRadius) {
            newConfig.playerVisibilityRadius = getVisibilityRadiusAuto(
                zone,
                0.05
            );
        }
        if (!config.playerActionRadius) {
            const AR = getVisibilityRadiusAuto(zone, 0.045);
            if (config.playerVisibilityRadius) {
                newConfig.playerActionRadius =
                    AR < config.playerVisibilityRadius
                        ? AR
                        : config.playerVisibilityRadius * 0.95;
            } else {
                newConfig.playerActionRadius = AR;
            }
        }
        if (!config.flagVisibilityRadius) {
            newConfig.flagVisibilityRadius = getVisibilityRadiusAuto(
                zone,
                0.05
            );
        }
        if (!config.flagActionRadius) {
            const AR = getVisibilityRadiusAuto(zone, 0.045);
            if (config.flagVisibilityRadius) {
                newConfig.flagActionRadius =
                    AR < config.flagVisibilityRadius
                        ? AR
                        : config.flagVisibilityRadius * 0.95;
            } else {
                newConfig.flagActionRadius = AR;
            }
        }

        return updateById(newConfig);
    };

    const itemModelsRadius = (config, zone) => {
        return getItemsModel(config.id)
            .then(res => {
                return Promise.all(
                    res.data.map(m => {
                        const newModel = {};
                        if (!m.visibilityRadius) {
                            newModel.visibilityRadius = getVisibilityRadiusAuto(
                                zone,
                                0.04
                            );
                        }
                        if (!m.actionRadius) {
                            const AR = getVisibilityRadiusAuto(zone, 0.035);
                            if (m.visibilityRadius) {
                                newModel.actionRadius =
                                    AR < m.visibilityRadius
                                        ? AR
                                        : m.visibilityRadius * 0.95;
                            } else {
                                newModel.actionRadius = AR;
                            }
                        }

                        return updateItemsModel(config.id, m.id, newModel);
                    })
                );
            })
            .catch(() => {
                throw 'Impossible de télécharger la configuration';
            });
    };

    const itemsRadius = (config, zone) => {
        return getItems(config.id)
            .then(res => {
                return Promise.all(
                    res.data.map(m => {
                        const newModel = {};
                        if (!m.visibilityRadius) {
                            newModel.visibilityRadius = getVisibilityRadiusAuto(
                                zone,
                                0.04
                            );
                        }
                        if (!m.actionRadius) {
                            const AR = getVisibilityRadiusAuto(zone, 0.035);
                            if (m.visibilityRadius) {
                                newModel.actionRadius =
                                    AR < m.visibilityRadius
                                        ? AR
                                        : m.visibilityRadius * 0.95;
                            } else {
                                newModel.actionRadius = AR;
                            }
                        }

                        return updateItem(config.id, m.id, newModel);
                    })
                );
            })
            .catch(() => {
                throw 'Impossible de télécharger la configuration';
            });
    };

    const calculateRadius = () => {
        return getById(configId)
            .then(res => {
                const config = res.data;

                return getAreas(configId)
                    .then(r => {
                        let zone = r.data.filter(z => z.forbidden === false)[0];
                        zone = formatZone(zone.position.coordinates[0]);

                        return Promise.all([
                            configRadius(config, zone),
                            itemModelsRadius(config, zone),
                            itemsRadius(config, zone)
                        ]);
                    })
                    .catch(() => {
                        throw 'Veuillez créer une zone de jeu valide';
                    });
            })
            .catch(err => {
                throw err;
            });
    };

    const checkTeams = () => {
        return getTeams(configId)
            .then(res => {
                if (res.data.length < 2) {
                    throw 'Veuillez créer au minimum 2 équipes';
                }
            })
            .catch(() => {
                throw 'Veuillez créer au minimum 2 équipes';
            });
    };

    const downloadConfig = mode => {
        setLoading(true);
        checkTeams()
            .then(() => {
                return calculateRadius().then(() => {
                    return exportConfiguration(configId, mode)
                        .then(res => {
                            const url = window.URL.createObjectURL(
                                new Blob([res.data])
                            );
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'crystalz.zip');
                            document.body.appendChild(link);
                            link.click();
                        })
                        .catch(() => {
                            throw 'Impossible de télécharger la configuration';
                        });
                });
            })
            .catch(err => toast.error(err))
            .finally(() => setLoading(false));
    };

    const handleDownload = mode => {
        setMode(mode);
        downloadConfig(mode);
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>Télécharger une configuration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="subtitle mb-4">
                    Pour povoir télécharger une configuration vous devez avoir
                    Docker et Docker-compose sur votre ordinateur.
                </label>

                <h5>Installation rapide (MacOS)</h5>
                <label>
                    Aller dans le dossier Config_python > build puis
                    double-cliquer sur CrystalZ-1.0
                </label>
                <Button
                    variant="success"
                    className="btn-primary"
                    onClick={() => handleDownload('rapide')}
                    disabled={loading}
                >
                    {loading && mode === 'rapide'
                        ? 'Téléchargement ...'
                        : 'Télécharger'}
                </Button>

                <h5 className="mt-3">
                    Installation manuelle (MacOS, Linux, Windows)
                </h5>
                <label>
                    Ouvrir un terminal dans le dossier téléchargé et lancer la
                    commande ./startup.sh
                </label>
                <Button
                    variant="success"
                    className="btn-primary"
                    onClick={() => handleDownload('manuel')}
                    disabled={loading}
                >
                    {loading && mode === 'manuel'
                        ? 'Téléchargement ...'
                        : 'Télécharger'}
                </Button>
            </Modal.Body>
        </Modal>
    );
}

export default DownloadButton;
