import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Composant Collapsable :
 * Permet d'afficher ou non du contenu en cliquant sur son titre
 *
 * props :
 *   - title: Titre
 *   - defaultOpen (optionnel) : Si le contenu doit être affiché ou non par défaut
 *   - children : Contenu
 */
function Collapsable({ title, defaultOpen = false, children }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <>
            <div
                className="mt-2 collapsable"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4>{title}</h4>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </div>

            {isOpen && children}
        </>
    );
}

export default Collapsable;
