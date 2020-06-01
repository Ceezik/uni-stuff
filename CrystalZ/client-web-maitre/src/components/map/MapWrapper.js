import React, { useEffect } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Alert, Button } from 'react-bootstrap';
import Map from './Map';
import { GameAreaProvider } from '../../utils/useGameAreas';
import { ForbiddenAreaProvider } from '../../utils/useForbiddenAreas';
import { PlayerProvider } from '../../utils/usePlayers';
import { FlagProvider } from '../../utils/useFlags';
import { MarkerProvider } from '../../utils/useMarkers';
import { useConfig } from '../../utils/useConfig';
import { ItemProvider } from '../../utils/useItems';
import Timer from './Timer';
import { TrapProvider } from '../../utils/useTraps';
import { ActionProvider } from '../../utils/useAction';
import SidebarWrapper from '../sidebar/SidebarWrapper';
import { useSocket } from '../../utils/useSocket';

/**
 * Composant MapWrapper :
 * Affiche la carte ainsi que diverses informations si nécessaire
 *
 * props :
 *   - setShowMap : Fonction permettant de choisir si on doit afficher ou non
 *                  la carte
 */
function MapWrapper({ setShowMap }) {
    const { config } = useConfig();
    const { socket } = useSocket();

    useEffect(() => {
        socket.on('onError', (err) => toast.error(err));
    }, []);

    return (
        <div className="map-container">
            {config.willLaunchAt && !config.launched && (
                <>
                    <Alert className="alert-toast" variant="success">
                        La partie va démarrer le{' '}
                        {moment(config.willLaunchAt).format(
                            'DD/MM/YYYY à HH:00'
                        )}
                    </Alert>

                    <Button
                        onClick={() => setShowMap(false)}
                        className="btn-toast-left"
                        variant="light"
                    >
                        Retour
                    </Button>
                </>
            )}

            {config.launched && config.duration && (
                <Timer
                    duration={config.duration}
                    launchedAt={config.launchedAt}
                />
            )}

            <GameAreaProvider>
                <ForbiddenAreaProvider>
                    <PlayerProvider>
                        <FlagProvider>
                            <MarkerProvider>
                                <ItemProvider>
                                    <TrapProvider>
                                        <ActionProvider>
                                            <SidebarWrapper />
                                            <Map />
                                        </ActionProvider>
                                    </TrapProvider>
                                </ItemProvider>
                            </MarkerProvider>
                        </FlagProvider>
                    </PlayerProvider>
                </ForbiddenAreaProvider>
            </GameAreaProvider>
        </div>
    );
}

export default MapWrapper;
