import React from 'react';
import { Button } from 'react-bootstrap';
import { useSocket } from '../../utils/useSocket';

/**
 * Composant ConfigVisibility:
 * Permet de rendre une partie publique
 *
 * props:
 *   - published : Si la partie est publique ou privée
 */
function ConfigVisibility({ published }) {
    const { socket } = useSocket();

    return published ? (
        <p>
            Votre partie est publique et visible par tous les joueurs
            recherchant une partie.
        </p>
    ) : (
        <>
            <p className="mb-0">
                Votre partie est accessible uniquement par les personnes
                connaissant son adresse IP et son port.
            </p>
            <Button
                className="mt-3"
                variant="success"
                onClick={() => socket.emit('publish')}
            >
                Rendre publique
            </Button>
        </>
    );
}

export default ConfigVisibility;
