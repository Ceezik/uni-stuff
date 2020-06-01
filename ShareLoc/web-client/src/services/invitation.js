import { request } from '../utils/request';

export const _getAll = () => {
    return request('/invitation', 'get');
};

export const _create = (colocationId, login) => {
    return request(`/invitation/colocation/${colocationId}`, 'post', login);
};

export const _update = (invitationId, accepted) => {
    return request(`/invitation/${invitationId}`, 'put', accepted);
};
