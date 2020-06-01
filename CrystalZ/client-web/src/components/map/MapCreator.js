import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import GameMap from './GameMap';
import MapMenuWrapper from './MapMenuWrapper';
import { MainZoneProvider } from '../../utils/useMainZone';
import { ForbiddenZoneProvider } from '../../utils/useForbiddenZone';
import { FlagProvider } from '../../utils/useFlag';
import { ItemProvider } from '../../utils/useItem';
import { ConfigProvider } from '../../utils/useConfig';

/**
 * Composant MapCreator :
 * Interface de création de la zone de jeu
 */
function MapCreator() {
    const [action, setAction] = useState('mainZone');
    const [sleepingAction, setSleepingAction] = useState('');
    const [devicePosition, setDevicePosition] = useState([]);
    const { configurationId } = useParams();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(e => {
            setDevicePosition({
                lat: e.coords.latitude,
                lng: e.coords.longitude
            });
        }) || setDevicePosition({ lat: 48.529918, lng: 7.737041 });
    }, []);

    useEffect(() => {
        (action === 'moveElementStop' || action === 'showPopupStop') &&
            setAction(sleepingAction) &&
            setSleepingAction('');
    }, [action]);

    return devicePosition.length === 0 ? (
        <Spinner animation="border" variant="light" />
    ) : (
        <div className="map-container">
            <ConfigProvider configId={configurationId}>
                <MainZoneProvider>
                    <ForbiddenZoneProvider>
                        <FlagProvider configId={configurationId}>
                            <ItemProvider>
                                <MapMenuWrapper
                                    action={action}
                                    setAction={setAction}
                                />
                                <GameMap
                                    configId={configurationId}
                                    defaultPosition={devicePosition}
                                    action={action}
                                    setAction={setAction}
                                    setSleepingAction={setSleepingAction}
                                />
                            </ItemProvider>
                        </FlagProvider>
                    </ForbiddenZoneProvider>
                </MainZoneProvider>
            </ConfigProvider>
        </div>
    );
}

export default MapCreator;
