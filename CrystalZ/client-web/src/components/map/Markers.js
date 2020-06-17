import React, { useRef, useState } from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import {
    iconWhiteFlag,
    iconGameArea,
    iconForbiddenArea,
    getItemIcon
} from './Icons';
import { getVisibilityRadiusAuto } from '../../utils/utils';
import { useMainZone } from '../../utils/useMainZone';
import { useForbiddenZone } from '../../utils/useForbiddenZone';
import { useFlag } from '../../utils/useFlag';
import { useItem } from '../../utils/useItem';
import ItemForm from './ItemForm';
import { serializeItem } from '../../utils/config';
import { useConfig } from '../../utils/useConfig';

/**
 * Composant Markers :
 * Regroupe l'ensemble des marqueurs à afficher sur la carte
 *
 * props :
 *   - closePopups : Méthode de fermeture des popups
 *   - polygonPosition : Tableau des coordonnées des points de la zone de jeu
 *   - flagsPositions : Tableau des coordonnées des cristaux
 *   - forbiddenZones : Tableau de tableaux des coordonnées des points des zones interdites
 *   - action : Action en cours
 *   - setAction : Setter de la variable action
 *   - setSleepingAction : Setter d'une variable d'action dormante
 *   - items : Tableau des items posés
 */
function Markers({
    closePopups,
    polygonPosition,
    flagsPositions,
    forbiddenZones,
    action,
    setAction,
    setSleepingAction,
    items
}) {
    const { config } = useConfig();

    const startDragging = () => {
        closePopups();
        setAction('moveElement');
        action !== 'showPopupStop' && setSleepingAction(action);
    };

    const stopDragging = () => {
        setAction('moveElementStop');
    };

    const actionToSleep = () => {
        setAction('showPopup');
        setSleepingAction(action);
    };

    return (
        <>
            {flagsPositions.map((flag, index) => (
                <FlagMarker
                    key={index}
                    flag={flag}
                    stopDragging={stopDragging}
                    startDragging={startDragging}
                    actionToSleep={actionToSleep}
                    flagVisibilityRadius={
                        config !== null && config.flagVisibilityRadius
                    }
                    flagActionRadius={
                        config !== null && config.flagActionRadius
                    }
                />
            ))}

            {polygonPosition.map((point, index) => (
                <MainZoneMarker
                    key={index}
                    point={point}
                    stopDragging={stopDragging}
                    startDragging={startDragging}
                    actionToSleep={actionToSleep}
                />
            ))}

            {forbiddenZones.map(zone =>
                zone.map((point, index) => (
                    <ForbiddenZoneMarker
                        key={index}
                        point={point}
                        stopDragging={stopDragging}
                        startDragging={startDragging}
                        actionToSleep={actionToSleep}
                    />
                ))
            )}

            {items.map((point, index) => (
                <ItemMarker
                    key={index}
                    point={point}
                    stopDragging={stopDragging}
                    startDragging={startDragging}
                    actionToSleep={actionToSleep}
                />
            ))}
        </>
    );
}

function MainZoneMarker({ point, stopDragging, startDragging, actionToSleep }) {
    const { move, remove } = useMainZone();
    const popup = useRef(null);

    return (
        <Marker
            position={point}
            icon={iconGameArea}
            draggable
            autoPan
            onDragend={e => {
                move(e, point);
                stopDragging();
            }}
            onDragStart={e => {
                startDragging();
            }}
            onClick={e => {
                actionToSleep();
            }}
        >
            <Popup ref={popup}>
                <button
                    className="btn-small  btn-danger"
                    onClick={e => {
                        popup.current.leafletElement.options.leaflet.map.closePopup();
                        remove(point);
                    }}
                >
                    Supprimer
                </button>
            </Popup>
        </Marker>
    );
}

function ForbiddenZoneMarker({
    point,
    stopDragging,
    startDragging,
    actionToSleep
}) {
    const { move, remove } = useForbiddenZone();
    const popup = useRef(null);

    return (
        <Marker
            position={point}
            icon={iconForbiddenArea}
            draggable
            autoPan
            onDragend={e => {
                move(e, point);
                stopDragging();
            }}
            onDragStart={e => {
                startDragging();
            }}
            onClick={e => {
                actionToSleep();
            }}
        >
            <Popup ref={popup}>
                <button
                    className="btn-small  btn-danger"
                    onClick={e => {
                        popup.current.leafletElement.options.leaflet.map.closePopup();
                        remove(point);
                    }}
                >
                    Supprimer
                </button>
            </Popup>
        </Marker>
    );
}

function FlagMarker({
    flag,
    stopDragging,
    startDragging,
    flagVisibilityRadius,
    flagActionRadius,
    actionToSleep
}) {
    const { move, remove, showFlags } = useFlag();
    const { position: mainZone } = useMainZone();
    const popup = useRef(null);

    return showFlags ? (
        <>
            <Marker
                position={flag}
                icon={iconWhiteFlag}
                draggable
                onDragend={e => {
                    move(e, flag);
                    stopDragging();
                }}
                onDragStart={e => {
                    startDragging();
                }}
                onClick={e => {
                    actionToSleep();
                }}
            >
                <Popup ref={popup}>
                    <button
                        className="btn-small  btn-danger"
                        onClick={e => {
                            popup.current.leafletElement.options.leaflet.map.closePopup();
                            remove(flag);
                        }}
                    >
                        Supprimer
                    </button>
                </Popup>
            </Marker>

            <Circle
                center={flag}
                radius={
                    flagVisibilityRadius ||
                    getVisibilityRadiusAuto(mainZone, 0.05)
                }
                stroke={false}
            />

            <Circle
                center={flag}
                radius={
                    flagActionRadius || getVisibilityRadiusAuto(mainZone, 0.045)
                }
                stroke={false}
            />
        </>
    ) : (
        <></>
    );
}

function ItemMarker({ point, stopDragging, startDragging, actionToSleep }) {
    const [showModal, setShowModal] = useState(false);
    const { move, updateItem, remove, showRadius, hiddenItems } = useItem();
    const { position: mainZone } = useMainZone();
    const popup = useRef(null);
    const icon = getItemIcon(point);

    const handleClose = () => setShowModal(false);

    const onSubmit = data => {
        updateItem(point, serializeItem(data));
        handleClose();
    };

    return hiddenItems.indexOf(point.name) === -1 ? (
        <>
            <Marker
                position={point.position}
                icon={icon}
                draggable
                onDragend={e => {
                    move(e, point);
                    stopDragging();
                }}
                onDragStart={e => {
                    startDragging();
                }}
                onClick={e => {
                    actionToSleep();
                }}
            >
                <Popup ref={popup}>
                    {point.name} ({point.quantity})
                    <button
                        className="mt-2 btn-small btn-light"
                        onClick={() => setShowModal(true)}
                    >
                        Modifier
                    </button>
                    <button
                        className="mt-1 btn-small btn-danger"
                        onClick={e => {
                            popup.current.leafletElement.options.leaflet.map.closePopup();
                            remove(point);
                        }}
                    >
                        Supprimer
                    </button>
                </Popup>
            </Marker>

            <ItemForm
                item={point}
                showModal={showModal}
                handleClose={handleClose}
                model={false}
                onSubmit={onSubmit}
            />

            {showRadius && (
                <>
                    <Circle
                        center={point.position}
                        radius={
                            point.visibilityRadius ||
                            getVisibilityRadiusAuto(mainZone, 0.04)
                        }
                        stroke={false}
                    />

                    <Circle
                        center={point.position}
                        radius={
                            point.actionRadius ||
                            getVisibilityRadiusAuto(mainZone, 0.035)
                        }
                        stroke={false}
                    />
                </>
            )}
        </>
    ) : (
        <></>
    );
}

export default Markers;
