import { useState, useEffect } from 'react';
import request from './request';

/**
 * CustomHook useDataFromUrl :
 * Récupère les données à une url données
 *
 * @param string url Route pour récupérer les données
 */
export const useDataFromUrl = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setLoading(true);
        let promise;

        if (Array.isArray(url)) {
            promise = Promise.all(
                url.map(u => {
                    return request.get(u);
                })
            );
        } else {
            promise = request.get(url);
        }

        promise
            .then(res => setData(res.data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [url]);

    return { loading, error, data, setData };
};
