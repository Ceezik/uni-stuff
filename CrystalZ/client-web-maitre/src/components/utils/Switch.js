import React from 'react';
import '../../switch.css';

/**
 * Composant Switch :
 * Bouton ayant 2 états : activé ou désactivé
 *
 * props :
 *   - on : Si le bouton est activé ou non
 *   - setOn : Fonction permettant de changer l'état du bouton
 */
function Switch({ on, setOn }) {
    return (
        <label className="switch">
            <input type="checkbox" checked={on} onChange={setOn} />
            <span className="slider round"></span>
        </label>
    );
}

export default Switch;
