import React from 'react';
import { useFormContext } from './Form';

/**
 * Composant RadioButtom :
 * RadioButton personnalisé de l'appli web CrystalZ
 *
 * props :
 *   - name : Nom du bouton
 *   - value : Valeur du bouton
 *   - label : Label du bouton
 *   - checked : booleen à true si le bouton est sélectionné
 *   - validationSchema : Schema des valeurs autorisés
 *   - rest : Autres props du radioButton
 */
function RadioButton({
    name,
    value,
    label,
    checked,
    validationSchema,
    ...rest
}) {
    const { register } = useFormContext();

    return (
        <label {...rest}>
            {label}
            <input
                type="radio"
                name={name}
                value={value}
                defaultChecked={checked}
                ref={register(validationSchema)}
            />
            <span className="checkmark"></span>
        </label>
    );
}

export default RadioButton;
