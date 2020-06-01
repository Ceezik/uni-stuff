import { request } from '../utils/request';

export const _createVoteService = (idColocation, idService, vote) => {
    return request(
        `/colocation/${idColocation}/service/${idService}/vote`,
        'post',
        vote
    );
};

export const _createVoteAchievedService = (idColocation, idService, vote) => {
    return request(
        `/colocation/${idColocation}/achieved-service/${idService}/vote`,
        'post',
        vote
    );
};

export const _createVoteDeleteService = (idColocation, idService, vote) => {
    return request(
        `/colocation/${idColocation}/service/${idService}/delete/vote`,
        'post',
        vote
    );
};
