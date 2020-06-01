import { useState, useEffect } from 'react';
import { getToken } from './cookies';

export const handleResponse = res => {
    if (res.ok) return res.json();
    else throw res.status;
};

export function request(route, method, body = null) {
    const token = getToken();
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(
        `
        http://cdad95.iutrs.unistra.fr:8080/ShareLoc/api${route}`,
        options
    ).then(handleResponse);
}

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
                    return request(u, 'get');
                })
            );
        } else {
            promise = request(url, 'get');
        }

        promise
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [url]);

    return { loading, error, data, setData };
};
