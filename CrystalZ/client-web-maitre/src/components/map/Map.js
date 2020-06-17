import React, { useEffect, useState, useRef } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { getCenterOfBounds } from 'geolib';
import ScoreModal from './ScoreModal';
import { useSocket } from '../../utils/useSocket';
import { useGameAreas } from '../../utils/useGameAreas';
import GameArea from './GameArea';
import {
    deserializePoint,
    formatAreas,
    isInForbiddenAreas,
    isInGameAreas,
    deserializeClick,
} from '../../utils/map';
import { useForbiddenAreas } from '../../utils/useForbiddenAreas';
import ForbiddenArea from './ForbiddenArea';
import { useFlags } from '../../utils/useFlags';
import PlayerList from './PlayerList';
import { useItems } from '../../utils/useItems';
import { useTraps } from '../../utils/useTraps';
import { useTeams } from '../../utils/useTeams';
import { useAction } from '../../utils/useAction';
import FlagList from './FlagList';
import MarkerList from './MarkerList';
import ItemList from './ItemList';
import TrapList from './TrapList';

/**
 * Composant Map :
 * Affiche la carte et les différents marqueurs
 */
function Map() {
    const { socket } = useSocket();
    const [zoom] = useState(17);
    const [position, setPosition] = useState(null);
    const [showScore, setShowScore] = useState(false);
    const { gameAreas, setGameAreas, createGameAreaPoint } = useGameAreas();
    const {
        forbiddenAreas,
        setForbiddenAreas,
        createForbiddenAreaPoint,
    } = useForbiddenAreas();
    const { flags, createFlag, deleteFlag } = useFlags();
    const { items, createItem, deleteItem } = useItems();
    const { traps, deleteTrap } = useTraps();
    const { setTeams } = useTeams();
    const {
        action,
        setAction,
        sleepingAction,
        setSleepingAction,
    } = useAction();
    const map = useRef(null);

    useEffect(() => {
        socket.on('getAreas', (a) => {
            setGameAreas(formatAreas(a.filter((area) => !area.forbidden)));
            setForbiddenAreas(formatAreas(a.filter((area) => area.forbidden)));
        });
        socket.emit('getAreas');

        socket.on('getTeams', (t) => setTeams(t));
        socket.emit('getTeams');

        const interval = setInterval(() => socket.emit('adminRoutine'), 1000);
        localStorage.removeItem('moving');

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (
            gameAreas.length > 0 &&
            !position &&
            gameAreas[0].coordinates[0].length > 0
        ) {
            setPosition(
                deserializePoint(getCenterOfBounds(gameAreas[0].coordinates[0]))
            );
        }
    }, [gameAreas]);

    useEffect(() => {
        if (action === 'moveElementStop' || action === 'showPopupStop') {
            setAction(sleepingAction);
            setSleepingAction(null);
        }
    }, [action]);

    useEffect(() => {
        checkObjects(flags, deleteFlag);
        checkObjects(items, deleteItem);
        checkObjects(traps, deleteTrap);
    }, [gameAreas, forbiddenAreas]);

    const checkObjects = (objects, deleteObject) => {
        objects.forEach((o) => {
            if (
                isInForbiddenAreas(o.coordinates, forbiddenAreas) ||
                !isInGameAreas(o.coordinates, gameAreas)
            ) {
                deleteObject(o);
            }
        });
    };

    const centerOnGameArea = () => {
        if (gameAreas.length > 0 && gameAreas[0].coordinates[0].length > 0) {
            map.current.leafletElement.panTo(
                deserializePoint(getCenterOfBounds(gameAreas[0].coordinates[0]))
            );
        }
    };

    const handleAction = (e) => {
        const coordinates = deserializeClick(e);
        switch (action) {
            case 'gameArea':
                createGameAreaPoint(coordinates);
                break;
            case 'forbiddenArea':
                createForbiddenAreaPoint(coordinates);
                break;
            case 'flag':
                createFlag(coordinates);
                break;
            case 'item':
                createItem(coordinates);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <LeafletMap
                ref={map}
                className="map"
                center={position || [47.736544, 7.286776]}
                zoom={zoom}
                minZoom={5}
                maxZoom={25}
                onClick={handleAction}
                onpopupclose={() => setAction('showPopupStop')}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

                {gameAreas.map((area) => (
                    <GameArea key={area.id} area={area} />
                ))}

                {forbiddenAreas.map((area) => (
                    <ForbiddenArea key={area.id} area={area} />
                ))}

                <PlayerList />
                <FlagList />
                <MarkerList />
                <ItemList />
                <TrapList />
            </LeafletMap>

            <ScoreModal showScore={showScore} setShowScore={setShowScore} />

            <Row className="btn-toast">
                <Col xs="auto">
                    <Button
                        onClick={() => setShowScore(true)}
                        variant="success"
                    >
                        Score
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button onClick={centerOnGameArea} variant="light">
                        <FontAwesomeIcon icon={faVectorSquare} />
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default Map;
