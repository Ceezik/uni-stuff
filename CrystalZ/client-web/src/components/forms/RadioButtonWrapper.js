import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useFormContext } from './Form';

/**
 * Composant RadioButtonWrapper :
 * Affiche les boutons ainsi que le message d'erreur si besoin
 *
 * props :
 *   - name : Nom du bouton
 *   - children : Tableau des composants enfants
 */
function RadioButtonWrapper({ name, children }) {
    const { errors } = useFormContext();

    return (
        <Row>
            <Col>{children}</Col>
            <Col xs={12}>
                <div className="danger mt-2">
                    {errors[name] && errors[name].message}
                </div>
            </Col>
        </Row>
    );
}

export default RadioButtonWrapper;
