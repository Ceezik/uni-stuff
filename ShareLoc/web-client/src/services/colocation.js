import { request } from '../utils/request';

export const _create = colocation => {
    return request('/colocation', 'post', colocation);
};

export const _getColocation = idColocation => {
    return request(`/colocation/${idColocation} `, 'get');
};
