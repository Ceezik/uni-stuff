import React, { useState, useEffect, useRef } from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import {
    isInZone,
    getCenterZoneBox,
    getVisibilityRadiusAuto,
    getDistance
} from '../../utils/utils';
import Markers from './Markers';
import {
    formatMainZone,
    formatForbiddenZone,
    formatFlags,
    formatItems
} from '../../utils/config';
import {
    getAreas,
    getFlags,
    getItemsModel,
    getItems
} from '../../service/configuration';
import { useConfig } from '../../utils/useConfig';
import { useMainZone } from '../../utils/useMainZone';
import { useForbiddenZone } from '../../utils/useForbiddenZone';
import { useFlag } from '../../utils/useFlag';
import { useItem } from '../../utils/useItem';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { IconOverlay } from '../OverlayTip';

/**
 * Composant GameMap :
 * Représente la carte de l'application
 *
 * props :
 *   - defaultPosition : Coordonnées sur lesquelles est centrée la carte à son affichage
 *   - action : Action en cours
 *   - setAction : Setter de la variable action
 *   - setSleepingAction : Setter d'une variable d'action dormante
 *   - configId : Id de la configuration en cours d'édition
 */
function GameMap({
    defaultPosition,
    action,
    setAction,
    setSleepingAction,
    configId
}) {
    const [position, setPosition] = useState(defaultPosition);
    const [zoom, setZoom] = useState(17);
    const map = useRef(null);
    const { config } = useConfig();
    const {
        position: mainZone,
        setPosition: setMainZone,
        create: createMainZone
    } = useMainZone();
    const {
        forbiddenZoneIndex,
        setForbiddenZoneIndex,
        forbiddenZones,
        setForbiddenZones,
        create: createForbiddenZone
    } = useForbiddenZone();
    const { flagsPositions, setFlagsPositions, create: createFlag } = useFlag();
    const { items, setItems, setModelItems, create: createItem } = useItem();

    useEffect(() => {
        let forbZones = [];
        let zoneIndex = -1;
        getAreas(configId).then(zones => {
            zoneIndex++;
            zones.data.map(zone =>
                !zone.forbidden
                    ? (setMainZone(formatMainZone(zone)),
                      centerGameArea(formatMainZone(zone)))
                    : forbZones.push(formatForbiddenZone(zoneIndex, zone))
            );
        });

        setForbiddenZoneIndex(zoneIndex);
        setForbiddenZones(forbZones);

        getFlags(configId).then(flags => setFlagsPositions(formatFlags(flags)));

        getItemsModel(configId).then(res => setModelItems(res.data));

        getItems(configId).then(items => setItems(formatItems(items)));
    }, []);

    useEffect(() => {
        checkFlags();
        checkItems();
    }, [mainZone, forbiddenZones]);

    const checkFlags = () => {
        let conflict = false;
        let otherFlags = [];
        flagsPositions.filter(flag => {
            let valid = true;
            forbiddenZones.map(zone => {
                valid = !isInZone(flag.lat, flag.lng, zone);
                conflict = conflict || !valid;
            });
            let validZone = isInZone(flag.lat, flag.lng, mainZone);
            let conflictFlags = false;
            flagsPositions
                .filter(f => f.lat !== flag.lat && f.lng !== flag.lng)
                .map(
                    f2 =>
                        getDistance(f2, {
                            lat: flag.lat,
                            lng: flag.lng
                        }) <
                            (config.flagVisibilityRadius ||
                                getVisibilityRadiusAuto(mainZone, 0.05)) *
                                2 && (conflictFlags = true)
                );
            conflict = conflict || !validZone || conflictFlags;
            valid && validZone && !conflictFlags && otherFlags.push(flag);
        });

        if (conflict) {
            setFlagsPositions(otherFlags);
        }
    };

    const checkItems = () => {
        let conflict = false;
        let otherItems = [];
        items.filter(item => {
            let valid = true;
            forbiddenZones.map(zone => {
                valid = !isInZone(item.position.lat, item.position.lng, zone);
                conflict = conflict || !valid;
            });
            let validZone = isInZone(
                item.position.lat,
                item.position.lng,
                mainZone
            );
            conflict = conflict || !validZone;
            valid && validZone && otherItems.push(item);
        });

        if (conflict) {
            setItems(otherItems);
        }
    };

    const handleClick = e => {
        return action === 'flags'
            ? createFlag(e)
            : action === 'mainZone'
            ? createMainZone(e)
            : action === 'forbiddenZone'
            ? forbiddenZoneIndex !== -1
                ? createForbiddenZone(e)
                : toast.error('Veuillez créer une première zone interdite')
            : action === 'items'
            ? createItem(e)
            : '';
    };

    const closePopups = () => {
        map.current.leafletElement.closePopup();
    };

    const centerGameArea = gameArea => {
        if (gameArea.length > 0) {
            map.current.leafletElement.panTo(getCenterZoneBox(gameArea));
        }
    };

    return (
        defaultPosition.length !== 0 && (
            <>
                <IconOverlay tipKey="centerOnGameArea">
                    <Button
                        variant="light"
                        className="btn-toast"
                        onClick={() => centerGameArea(mainZone)}
                    >
                        <FontAwesomeIcon icon={faVectorSquare} />
                    </Button>
                </IconOverlay>

                <Map
                    ref={map}
                    center={position}
                    zoom={zoom}
                    onClick={handleClick}
                    minZoom={5}
                    maxZoom={25}
                    onPopupClose={() => setAction('showPopupStop')}
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    <Polygon color="green" positions={mainZone} />

                    {forbiddenZones.map((zone, index) => (
                        <Polygon
                            key={index}
                            color="red"
                            positions={
                                forbiddenZones[forbiddenZones.indexOf(zone)]
                            }
                        />
                    ))}

                    <Markers
                        closePopups={closePopups}
                        polygonPosition={mainZone}
                        flagsPositions={flagsPositions}
                        forbiddenZones={forbiddenZones}
                        action={action}
                        setAction={setAction}
                        setSleepingAction={setSleepingAction}
                        items={items}
                    />
                </Map>
            </>
        )
    );
}

export default GameMap;
