import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

/**
 * Composant DurationInput :
 * Input permettant de choisir une durée en jour, heures, minutes et secondes
 *
 * props :
 *   - duration : La durée à afficher
 *   - setDuration : Fonction permettant de modifier la durée
 *   - onBlur (optionnel) : Fonction qui sera appelée lors de l'évènement 'onBlur'
 *                          sur les inputs
 */
function DurationInput({ duration, setDuration, onBlur = () => {} }) {
    const [secondes, setSecondes] = useState(duration % 60);
    const [minutes, setMinutes] = useState(Math.floor((duration % 3600) / 60));
    const [heures, setHeures] = useState(
        Math.floor((duration % (3600 * 24)) / 3600)
    );
    const [jours, setJours] = useState(Math.floor(duration / (3600 * 24)));

    useEffect(() => {
        let s = secondes ? secondes : 0,
            m = minutes ? minutes : 0,
            h = heures ? heures : 0,
            j = jours ? jours : 0;

        setDuration(s + m * 60 + h * 3600 + j * 86400);
    }, [secondes, minutes, heures, jours]);

    return (
        <Table borderless responsive variant="dark" className="table-light">
            <thead>
                <tr>
                    <th>jours</th>
                    <th>heures</th>
                    <th>minutes</th>
                    <th>secondes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>
                        <InputNumber
                            onBlur={onBlur}
                            v={jours}
                            setV={setJours}
                            min={0}
                            max={365}
                        />
                    </th>
                    <th>
                        <InputNumber
                            onBlur={onBlur}
                            v={heures}
                            setV={setHeures}
                            min={0}
                            max={24}
                        />
                    </th>
                    <th>
                        <InputNumber
                            onBlur={onBlur}
                            v={minutes}
                            setV={setMinutes}
                            min={0}
                            max={60}
                        />
                    </th>
                    <th>
                        <InputNumber
                            onBlur={onBlur}
                            v={secondes}
                            setV={setSecondes}
                            min={0}
                            max={60}
                        />
                    </th>
                </tr>
            </tbody>
        </Table>
    );
}

function InputNumber({ onBlur, v, setV, min, max }) {
    const handleChange = (e) => {
        const value = e.target.value
            ? Math.max(
                  Number(min),
                  Math.min(Number(max), Number(e.target.value))
              )
            : '';
        setV(value);
    };

    return (
        <input
            onBlur={onBlur}
            className="input-dark"
            style={{ width: '50px', paddingLeft: '5px' }}
            type="number"
            value={Number.isNaN(v) ? 0 : v}
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={handleChange}
        />
    );
}

export default DurationInput;
