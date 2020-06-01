import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { secondsToDuration } from '../../utils/utils';
import { Row, Col } from 'react-bootstrap';

/**
 * Composant FlagForm :
 * Affiche le temps restant de la partie
 *
 * props :
 *   - duration : Durée de la partie
 *   - launchedAt : Date à laquelle la partie a été lancée
 */
function Timer({ duration, launchedAt }) {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const i = setInterval(() => setTime(getTime()), 1000);
        return () => clearInterval(i);
    }, []);

    const getTime = () => {
        return Math.floor(
            duration -
                moment.duration(moment().diff(moment(launchedAt))).asSeconds()
        );
    };

    return time ? (
        <Row className="btn-toast-left px-1 align-items-center">
            <Col xs="auto" className="pr-2">
                <FontAwesomeIcon icon={faClock} size="lg" />
            </Col>
            <Col xs="auto" className="pl-2">
                <h6 className="mb-0">{secondsToDuration(time)}</h6>
            </Col>
        </Row>
    ) : (
        <></>
    );
}

export default Timer;
