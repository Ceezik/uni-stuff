import { request } from '../utils/request';

export const _create = (idColocation, service) => {
    return request(`/colocation/${idColocation}/service`, 'post', service);
};

export const _getAll = idColocation => {
    return request(`/colocation/${idColocation}/service`, 'get');
};
