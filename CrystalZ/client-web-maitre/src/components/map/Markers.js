import React, { useRef, useState } from 'react';
import { Marker as LeafletMarker, Popup, Circle } from 'react-leaflet';
import {
    iconForbiddenArea,
    iconGameArea,
    iconPlayer,
    iconFlag,
    iconMarkerNegative,
    iconMarkerPositive,
    getItemIcon,
} from '../../utils/icons';
import { useConfig } from '../../utils/useConfig';
import { useFlags } from '../../utils/useFlags';
import { deserializeDragend } from '../../utils/map';
import { useMarkers } from '../../utils/useMarkers';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { useGameAreas } from '../../utils/useGameAreas';
import { useForbiddenAreas } from '../../utils/useForbiddenAreas';
import { useItems } from '../../utils/useItems';
import { useTeams } from '../../utils/useTeams';
import {
    secondsToDuration,
    areFlagEqual,
    areMarkerEqual,
    areItemEqual,
    areTrapEqual,
} from '../../utils/utils';
import moment from 'moment';
import { useTraps } from '../../utils/useTraps';
import { useAction } from '../../utils/useAction';
import ItemForm from '../sidebar/ItemForm';
import Inventory from './Inventory';

/**
 * Composant Marker :
 * Marqueur affiché sur la carte
 *
 * props :
 *   - ondragstart : Fonction appelée au début du déplacement d'un marqueur
 *   - ondragend : Fonction appelée à la fin du déplacement d'un marqueur
 *   - children : Contenu du marqueur
 */
function Marker({ ondragstart, ondragend, children, ...props }) {
    const { action, setAction, setSleepingAction } = useAction();

    const handleDragStart = () => {
        setSleepingAction(action);
        setAction('moveElement');
        ondragstart && ondragstart();
    };

    const handleDragEnd = (e) => {
        setAction('moveElementStop');
        ondragend && ondragend(e);
    };

    const handleClick = () => {
        setSleepingAction(action);
        setAction('showPopup');
    };

    return (
        <LeafletMarker
            ondragstart={handleDragStart}
            ondragend={handleDragEnd}
            onClick={handleClick}
            {...props}
        >
            {children}
        </LeafletMarker>
    );
}

/**
 * Composant GameAreaMarker :
 * Marqueur pour un point de la zone de jeu
 *
 * props :
 *   - position : La position du point
 *   - areaId : L'identifiant de la zone de jeu
 */
export function GameAreaMarker({ position, areaId }) {
    const { moveGameArea, deleteGameAreaPoint } = useGameAreas();
    const popup = useRef(null);

    return (
        <Marker
            draggable
            ondragend={(e) => moveGameArea(deserializeDragend(e), position)}
            position={position}
            icon={iconGameArea}
        >
            <Popup ref={popup}>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                        popup.current.leafletElement.options.leaflet.map.closePopup();
                        deleteGameAreaPoint(position, areaId);
                    }}
                >
                    Supprimer
                </Button>
            </Popup>
        </Marker>
    );
}

/**
 * Composant ForbiddenAreaMarker :
 * Marqueur pour un point d'une zone interdite
 *
 * props :
 *   - position : La position du point
 *   - areaId : L'identifiant de la zone interdite
 */
export function ForbiddenAreaMarker({ position, areaId }) {
    const { moveForbiddenArea, deleteForbiddenAreaPoint } = useForbiddenAreas();
    const popup = useRef(null);

    return (
        <Marker
            draggable
            ondragend={(e) =>
                moveForbiddenArea(deserializeDragend(e), position, areaId)
            }
            position={position}
            icon={iconForbiddenArea}
        >
            <Popup ref={popup}>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                        popup.current.leafletElement.options.leaflet.map.closePopup();
                        deleteForbiddenAreaPoint(position, areaId);
                    }}
                >
                    Supprimer
                </Button>
            </Popup>
        </Marker>
    );
}

/**
 * Composant PlayerMarker :
 * Marqueur pour un joueur
 *
 * props :
 *   - player: Le joueur
 */
export function PlayerMarker({ player }) {
    const color = player.isConnected ? player.teamColor : 'grey';
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Marker position={player.coordinates} icon={iconPlayer(color)}>
                <Popup>
                    <Row className="justify-content-center">
                        <Col xs={12}>
                            {player.username}{' '}
                            {!player.isConnected && '(Déconnecté)'}
                        </Col>

                        {player.noyaux.length > 0 && (
                            <Col xs={12}>
                                {`Protégé par ${player.noyaux.length} noyau${
                                    player.noyaux.length > 1 ? 'x' : ''
                                }`}
                            </Col>
                        )}

                        {player.immobilizedUntil && (
                            <Col xs={12}>
                                Immobilisé pendant{' '}
                                {secondsToDuration(
                                    moment
                                        .duration(
                                            moment(
                                                player.immobilizedUntil
                                            ).diff(moment())
                                        )
                                        .asSeconds()
                                )}
                            </Col>
                        )}

                        <Col className="mt-2" xs="auto">
                            <Button
                                variant="light"
                                size="sm"
                                onClick={() => setShowModal(true)}
                            >
                                Inventaire
                            </Button>
                        </Col>
                    </Row>
                </Popup>
            </Marker>

            <Inventory
                player={player}
                showModal={showModal}
                handleClose={() => setShowModal(false)}
            />
        </>
    );
}

/**
 * Composant Flag :
 * Marqueur pour un cristal
 *
 * props :
 *   - flag: Le cristal
 */
function Flag({ flag }) {
    const color = flag.team ? flag.team.color : 'grey';
    const { config } = useConfig();
    const { moveFlag, deleteFlag, captureFlag, resetFlag } = useFlags();
    const { teams } = useTeams();
    const teamInput = useRef(null);

    return (
        <>
            <Marker
                position={flag.coordinates}
                icon={iconFlag(color)}
                draggable
                ondragstart={() => localStorage.setItem('moving', 1)}
                ondragend={(e) => {
                    moveFlag(deserializeDragend(e), flag);
                    localStorage.removeItem('moving');
                }}
            >
                <Popup>
                    <Row className="justify-content-center">
                        <Col xs="12">
                            {flag.team
                                ? `Capturé par ${flag.team.name}`
                                : 'Non capturé'}
                        </Col>

                        {flag.hasOracle && (
                            <Col xs="12">Protégé par un oracle</Col>
                        )}

                        {flag.capturedUntil && (
                            <Col xs="12">
                                Incapturable pendant{' '}
                                {secondsToDuration(
                                    moment
                                        .duration(
                                            moment(flag.capturedUntil).diff(
                                                moment()
                                            )
                                        )
                                        .asSeconds()
                                )}
                            </Col>
                        )}

                        <Col className="mt-2" xs="12">
                            <Row className="justify-content-center">
                                <Col xs="auto">
                                    <Form.Control
                                        ref={teamInput}
                                        style={{ width: '200px' }}
                                        defaultValue={
                                            flag.team ? flag.team.id : null
                                        }
                                        as="select"
                                    >
                                        {teams.map((team) => (
                                            <option
                                                key={team.id}
                                                value={team.id}
                                            >
                                                {team.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col className="mt-1" xs="auto">
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() =>
                                            captureFlag(
                                                flag.id,
                                                teamInput.current.value
                                            )
                                        }
                                    >
                                        Capturer
                                    </Button>
                                    <Button
                                        className="ml-2"
                                        disabled={!flag.team}
                                        variant="light"
                                        size="sm"
                                        onClick={() => resetFlag(flag.id)}
                                    >
                                        Réinitialiser
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="mt-2" xs="auto">
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteFlag(flag)}
                            >
                                Supprimer
                            </Button>
                        </Col>
                    </Row>
                </Popup>
            </Marker>

            <Circle
                center={flag.coordinates}
                radius={config.flagVisibilityRadius}
                stroke={false}
            />

            <Circle
                center={flag.coordinates}
                radius={config.flagActionRadius}
                stroke={false}
            />
        </>
    );
}

/**
 * Composant MapMarker :
 * Marqueur pour un point d'intérêt
 *
 * props :
 *   - marker: Le point d'intérêt
 */
export function MapMarker({ marker }) {
    const color = marker.team.color;
    const { moveMarker, deleteMarker } = useMarkers();

    return (
        <Marker
            position={marker.coordinates}
            icon={
                marker.isPositive
                    ? iconMarkerPositive(color)
                    : iconMarkerNegative(color)
            }
            draggable
            ondragstart={() => localStorage.setItem('moving', 1)}
            ondragend={(e) => {
                moveMarker(deserializeDragend(e), marker);
                localStorage.removeItem('moving');
            }}
        >
            <Popup>
                <Row className="justify-content-center">
                    <Col xs="12">
                        Point{' '}
                        {marker.isPositive ? "d'intérêt" : 'de désintérêt'}{' '}
                        signalé par {marker.team.name}
                    </Col>
                    <Col className="mt-2" xs="auto">
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteMarker(marker)}
                        >
                            Supprimer
                        </Button>
                    </Col>
                </Row>
            </Popup>
        </Marker>
    );
}

/**
 * Composant Item :
 * Marqueur pour un item
 *
 * props :
 *   - item: L'item
 */
export function Item({ item }) {
    const icon = getItemIcon(item.name);
    const [showModal, setShowModal] = useState(false);
    const { moveItem, deleteItem, showRadius } = useItems();

    return (
        <>
            <Marker
                icon={icon}
                position={item.coordinates}
                draggable
                ondragstart={() => localStorage.setItem('moving', 1)}
                ondragend={(e) => {
                    moveItem(deserializeDragend(e), item);
                    localStorage.removeItem('moving');
                }}
            >
                <Popup>
                    <Row className="justify-content-center">
                        <Col xs="12">
                            {item.name} ({item.quantity})
                        </Col>

                        {item.waitingUntil && (
                            <Col xs="12">
                                Non-ramassable pendant{' '}
                                {secondsToDuration(
                                    moment
                                        .duration(
                                            moment(item.waitingUntil).diff(
                                                moment()
                                            )
                                        )
                                        .asSeconds()
                                )}
                            </Col>
                        )}

                        <Col className="mt-2" xs="auto">
                            <Button
                                variant="light"
                                size="sm"
                                onClick={() => setShowModal(true)}
                            >
                                Modifier
                            </Button>
                        </Col>

                        <Col className="mt-2" xs="auto">
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteItem(item)}
                            >
                                Supprimer
                            </Button>
                        </Col>
                    </Row>
                </Popup>
            </Marker>

            {showRadius && (
                <>
                    <Circle
                        center={item.coordinates}
                        radius={item.visibilityRadius}
                        stroke={false}
                    />

                    <Circle
                        center={item.coordinates}
                        radius={item.actionRadius}
                        stroke={false}
                    />
                </>
            )}

            <ItemForm
                item={item}
                showModal={showModal}
                handleClose={() => setShowModal(false)}
                model={false}
            />
        </>
    );
}

/**
 * Composant Trap :
 * Marqueur pour un piège
 *
 * props :
 *   - trap: Le piège
 */
export function Trap({ trap }) {
    const icon = getItemIcon(trap.name);
    const { moveTrap, deleteTrap } = useTraps();

    return (
        <>
            <Marker
                icon={icon}
                position={trap.coordinates}
                draggable
                ondragstart={() => localStorage.setItem('moving', 1)}
                ondragend={(e) => {
                    moveTrap(deserializeDragend(e), trap);
                    localStorage.removeItem('moving');
                }}
            >
                <Popup>
                    <Row className="justify-content-center">
                        <Col xs="12">
                            {trap.name} posé par {trap.owner.username}
                        </Col>

                        {trap.inactiveUntil && (
                            <Col xs="12">
                                Activé dans{' '}
                                {secondsToDuration(
                                    moment
                                        .duration(
                                            moment(trap.inactiveUntil).diff(
                                                moment()
                                            )
                                        )
                                        .asSeconds()
                                )}
                            </Col>
                        )}

                        <Col className="mt-2" xs="auto">
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteTrap(trap)}
                            >
                                Supprimer
                            </Button>
                        </Col>
                    </Row>
                </Popup>
            </Marker>

            <Circle
                center={trap.coordinates}
                radius={trap.visibilityRadius}
                stroke={false}
            />

            <Circle
                center={trap.coordinates}
                radius={trap.actionRadius}
                stroke={false}
            />
        </>
    );
}

/**
 * Composant FlagMarker :
 * Modifie le composant Flag uniquement si le cristal a changé
 */
export const FlagMarker = React.memo(Flag, areFlagEqual);

/**
 * Composant MarkerMarker :
 * Modifie le composant MapMarker uniquement si le point d'intérêt a changé
 */
export const MarkerMarker = React.memo(MapMarker, areMarkerEqual);

/**
 * Composant ItemMarker :
 * Modifie le composant Item uniquement si l'item a changé
 */
export const ItemMarker = React.memo(Item, areItemEqual);

/**
 * Composant TrapMarker :
 * Modifie le composant Trap uniquement si le piège a changé
 */
export const TrapMarker = React.memo(Trap, areTrapEqual);
