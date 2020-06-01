import React, { useState } from 'react';
import EditPassword from './EditPassword';

function Parameters({ user }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <h3 className="mb-5">Paramètres</h3>
            <h6 onClick={() => setShowPassword(true)} className="danger mb-3">
                Changer de mot de passe
            </h6>

            {showPassword && <EditPassword setVisible={setShowPassword} />}
        </>
    );
}

export default Parameters;
