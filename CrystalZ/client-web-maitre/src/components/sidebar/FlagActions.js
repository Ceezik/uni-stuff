import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faEyeSlash,
    faEye,
    faCog,
    faDice,
} from '@fortawesome/free-solid-svg-icons';
import { useAction } from '../../utils/useAction';
import { useFlags } from '../../utils/useFlags';
import FlagForm from './FlagForm';

/**
 * Composant FlagActions :
 * Différentes actions réalisables sur les cristaux
 */
function FlagActions() {
    const iconFlag = require('../../icons/cristal.png');
    const [showModal, setShowModal] = useState(false);
    const { action, setAction } = useAction();
    const {
        createRandomFlags,
        showFlags,
        setShowFlags,
        deleteAllFlags,
    } = useFlags();
    const { register, handleSubmit, reset } = useForm();

    const _createRandom = ({ nbFlags }) => {
        reset({ nbFlags: null });
        createRandomFlags(nbFlags);
    };

    const handleAction = () => {
        setAction(action === 'flag' ? null : 'flag');
    };

    return (
        <Row className="mt-3 ml-1">
            <Col
                xs="auto"
                className={`mb-3 mr-3 actions-item ${
                    action === 'flag' && 'actions-item-selected'
                }`}
                onClick={handleAction}
            >
                <Image className="actions-item-img" src={iconFlag} />
            </Col>
            <Col xs="auto" className="mb-3 mr-3 actions-item">
                <form onSubmit={handleSubmit(_createRandom)}>
                    <input
                        className="input-sidebar"
                        type="number"
                        name="nbFlags"
                        ref={register}
                        required
                        min={1}
                        max={100}
                    />
                    <button type="submit" className="invisible-btn">
                        <FontAwesomeIcon
                            className="ml-2"
                            icon={faDice}
                            color="white"
                        />
                    </button>
                </form>
            </Col>
            <Col
                xs="auto"
                className="mb-3 mr-3 actions-item"
                onClick={deleteAllFlags}
            >
                <FontAwesomeIcon icon={faTrashAlt} className="danger" />
            </Col>
            <Col
                xs="auto"
                className="mb-3 mr-3 actions-item"
                onClick={() => setShowFlags(!showFlags)}
            >
                <FontAwesomeIcon icon={showFlags ? faEyeSlash : faEye} />
            </Col>
            <Col
                xs="auto"
                className="mb-3 actions-item"
                onClick={() => setShowModal(true)}
            >
                <FontAwesomeIcon icon={faCog} />
            </Col>

            <FlagForm
                showModal={showModal}
                handleClose={() => setShowModal(false)}
            />
        </Row>
    );
}

export default FlagActions;
