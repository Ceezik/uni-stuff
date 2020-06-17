import React, { useState } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import Form from '../forms/Form';
import Input from '../forms/Input';
import Button from '../forms/Button';
import RadioButton from '../forms/RadioButton';
import RadioButtonWrapper from '../forms/RadioButtonWrapper';
import { serializeConfig } from '../../utils/config';
import { create, updateById } from '../../service/configuration';
import history from '../../utils/history';
import ConfigMenu from './ConfigMenu';
import DurationInput from '../forms/DurationInput';
import { initializeItemModels } from '../../utils/items';
import { HelpButton } from '../OverlayTip';
import { GAME_TIPS } from '../../utils/tips';
import { toast } from 'react-toastify';

/**
 * Composant ConfigForm :
 * Première étape de la création d'une configuration avec les infos générales
 *
 * props :
 *   - config (optionnel) : Configuration à modifier
 */
function ConfigForm({ config }) {
    const [showDuration, setShowDuration] = useState(
        config ? config.gameMode != 'SUPREMACY' : false
    );
    const [flagCaptureDuration, setFlagCaptureDuration] = useState(
        config ? config.flagCaptureDuration : null
    );
    const [duration, setDuration] = useState(config ? config.duration : null);
    const [error, setError] = useState('');

    const validate = data => {
        if (
            (data.gameMode != 'SUPREMACY' && !duration) ||
            (data.gameMode != 'SUPREMACY' && duration < 60) ||
            (data.gameMode != 'SUPREMACY' && duration > 31536000)
        ) {
            setError(
                'Veuillez entrer une durée comprise entre 60 secondes et 1 an'
            );
        } else if (flagCaptureDuration < 60 || flagCaptureDuration > 31536000) {
            setError(
                'Veuillez entrer une durée comprise entre 60 secondes et 1 an'
            );
        } else {
            return true;
        }
        return false;
    };

    const createConfig = newConfig => {
        if (validate(newConfig)) {
            newConfig.flagCaptureDuration = flagCaptureDuration;
            newConfig.duration =
                newConfig.gameMode != 'SUPREMACY' ? duration : null;
            create(serializeConfig(newConfig))
                .then(res => {
                    const configId = res.data.id;
                    initializeItemModels(duration, configId).then(() =>
                        history.push(`/configs/${configId}/teams`)
                    );
                })
                .catch(err => setError(err.response.data));
        }
    };

    const updateConfig = newConfig => {
        if (validate(newConfig)) {
            newConfig.id = config.id;
            newConfig.flagCaptureDuration = flagCaptureDuration;
            newConfig.duration =
                newConfig.gameMode != 'SUPREMACY' ? duration : null;
            updateById(serializeConfig(newConfig))
                .then(() => toast.success('Configuration modifiée'))
                .catch(err => setError(err.response.data));
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <ConfigMenu
                        level={1}
                        configId={config ? config.id : null}
                    />

                    <h3 className="mb-5">
                        {config ? 'Modifier' : 'Créer'} une configuration
                    </h3>

                    <Form onSubmit={config ? updateConfig : createConfig}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <label>Nom *</label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Entrez un nom"
                            defaultValue={config && config.name}
                            validationSchema={{
                                required: 'Ce champ est obligatoire',
                                minLength: {
                                    value: 2,
                                    message:
                                        'Le nom doit faire entre 2 et 50 caractères'
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        'Le nom doit faire entre 2 et 50 caractères'
                                }
                            }}
                        />
                        <label>Mode de jeu *</label>
                        <Input
                            as="select"
                            name="gameMode"
                            defaultValue={config && config.gameMode}
                            onChange={e => {
                                setShowDuration(e.target.value != 'SUPREMACY');
                                e.target.value === 'SUPREMACY' &&
                                    setDuration(null);
                            }}
                            validationSchema={{
                                required: 'Ce champ est obligatoire'
                            }}
                        >
                            <option
                                title={GAME_TIPS['supremacy'].tip}
                                value="SUPREMACY"
                            >
                                SUPREMACY
                            </option>
                            <option title={GAME_TIPS['time'].tip} value="TIME">
                                TIME
                            </option>
                            <option title={GAME_TIPS['flag'].tip} value="FLAG">
                                FLAG
                            </option>
                        </Input>
                        {showDuration && (
                            <>
                                <label>Durée *</label>
                                <DurationInput
                                    duration={duration}
                                    setDuration={setDuration}
                                />
                            </>
                        )}
                        <label>Visible par *</label>
                        <RadioButtonWrapper name="isPrivate">
                            <RadioButton
                                name="isPrivate"
                                value={true}
                                label="moi uniquement"
                                className="radio-buttons-wrapper mr-3"
                                checked={config ? config.isPrivate : false}
                                validationSchema={{
                                    required: 'Ce champ est obligatoire'
                                }}
                            />
                            <RadioButton
                                name="isPrivate"
                                value={false}
                                label="la communauté"
                                className="radio-buttons-wrapper"
                                checked={config ? !config.isPrivate : false}
                                validationSchema={{
                                    required: 'Ce champ est obligatoire'
                                }}
                            />
                        </RadioButtonWrapper>
                        <label className="mt-5">
                            Nombre maximum de joueurs par équipe
                        </label>
                        <HelpButton tipKey="maxPlayers" />
                        <Input
                            type="number"
                            name="maxPlayers"
                            placeholder="Entrez un nombre"
                            defaultValue={config && config.maxPlayers}
                            validationSchema={{
                                min: {
                                    value: 1,
                                    message:
                                        'Veuillez choisir un nombre entre 1 et 100'
                                },
                                max: {
                                    value: 100,
                                    message:
                                        'Veuillez choisir un nombre entre 1 et 100'
                                }
                            }}
                        />
                        <label className="mt-5">
                            Durée de verrouillage des cristaux *
                        </label>{' '}
                        <HelpButton tipKey="locked" />
                        <DurationInput
                            duration={flagCaptureDuration}
                            setDuration={setFlagCaptureDuration}
                        />
                        <Row className="justify-content-end mt-5">
                            <Col xs="auto">
                                <Button
                                    variant="success"
                                    className="btn-primary"
                                    type="submit"
                                >
                                    {config ? 'Enregistrer' : 'Créer'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ConfigForm;
