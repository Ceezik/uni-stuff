import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataFromUrl } from '../../utils/request';
import Spinner from 'react-bootstrap/Spinner';
import ColocationDetails from './ColocationDetails';

function ColocationWrapper() {
    const { colocationId } = useParams();
    const { loading, error, data: colocation } = useDataFromUrl(
        `/colocation/${colocationId}`
    );

    return loading ? (
        <Spinner />
    ) : error ? (
        <p>Impossible de charger la colocation.</p>
    ) : (
        <ColocationDetails colocation={colocation} />
    );
}

export default ColocationWrapper;
