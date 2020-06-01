import React from 'react';

/**
 * Composant Switch :
 * Switch personnalisé de l'appli web CrystalZ
 *
 * props :
 *   - on : Booleen a true si le switch est allumé
 *   - setOn : Setter de la variable on
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
