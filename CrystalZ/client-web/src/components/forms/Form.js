import React, { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form as F } from 'react-bootstrap';

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

/**
 * Composant Form :
 * Formulaire personnalisé de l'appli web CrystalZ
 *
 * props :
 *   - children : Tableau des composatns enfants
 *   - onSubmit : Event appelé lors de la soumission du formulaire
 */
function Form({ children, onSubmit }) {
    const { register, handleSubmit, errors } = useForm();

    return (
        <F onSubmit={handleSubmit(onSubmit)}>
            <FormContext.Provider value={{ register, errors }}>
                {children}
            </FormContext.Provider>
        </F>
    );
}

export default Form;
