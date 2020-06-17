import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Composant Color :
 * Carré de couleur
 *
 * props :
 *   - c : Couleur du carré
 *   - color : Couleur sélectionné
 *   - setColor : Setter de la variable color
 */
const Color = ({ c, color, setColor }) => {
    return (
        <div
            className="mb-4 div-color"
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
        >
            {c === color && <FontAwesomeIcon icon={faCheck} size="lg" />}
        </div>
    );
};

export default Color;
