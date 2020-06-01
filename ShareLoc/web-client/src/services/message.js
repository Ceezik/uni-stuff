import { request } from '../utils/request';

export const _getAll = idColocation => {
    return request(`/colocation/${idColocation}/message`, 'get');
};

export const _create = (idColocation, message) => {
    return request(`/colocation/${idColocation}/message`, 'post', message);
};

export const _edit = (idColocation, idMessage, message) => {
    return request(
        `/colocation/${idColocation}/message/${idMessage}`,
        'put',
        message
    );
};

export const _delete = (idColocation, idMessage) => {
    return request(
        `/colocation/${idColocation}/message/${idMessage}`,
        'delete'
    );
};
