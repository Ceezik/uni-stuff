import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import MapMenu from './MapMenu';

/**
 * Composant MapMenuWrapper :
 * Composant englobant le menu de création de la carte
 *
 * props :
 *   - action : Action en cours
 *   - setAction : Setter de la variable action
 *   - setSleepingAction : Setter d'une variable d'action dormante
 */
function MapMenuWrapper({ action, setAction, setSleepingAction }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`map-menu map-menu-${isOpen ? 'open' : 'closed'}`}>
                <MapMenu
                    action={action}
                    setAction={setAction}
                    setSleepingAction={setSleepingAction}
                />
            </div>
            <div className="map-menu-angle" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon
                    icon={isOpen ? faAngleRight : faAngleLeft}
                    size="2x"
                />
            </div>
        </>
    );
}

export default MapMenuWrapper;
