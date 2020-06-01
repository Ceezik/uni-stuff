import { request } from '../utils/request';

export const _create = (idColocation, idService, to) => {
    return request(
        `/colocation/${idColocation}/achieved-service/service/${idService} `,
        'post',
        to
    );
};

export const _getAll = idColocation => {
    return request(`/colocation/${idColocation}/achieved-service/`, 'get');
};
