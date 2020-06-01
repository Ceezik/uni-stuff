import { request } from '../utils/request';

export const _getMembers = idColocation => {
    return request(`/colocation/${idColocation}/membre`, 'get');
};
