import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../../sidebar.css';
import Sidebar from './Sidebar';
import { ItemModelProvider } from '../../utils/useItemModels';

/**
 * Composant SidebarWrapper :
 * Permet d'afficher ou non le menu latéral
 */
function SidebarWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`map-menu map-menu-${isOpen ? 'open' : 'closed'}`}>
                <ItemModelProvider>
                    <Sidebar />
                </ItemModelProvider>
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

export default SidebarWrapper;
