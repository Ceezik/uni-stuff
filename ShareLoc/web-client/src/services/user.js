import { request } from '../utils/request';

export const _getProfil = () => {
    return request('/profil', 'get');
};

export const _getUsers = (colocationId) => {
    return request(`/user/colocation/${colocationId}`, 'get');
};

export const _updatePassword = credentials => {
    return request('/user/password', 'put', credentials);
};
