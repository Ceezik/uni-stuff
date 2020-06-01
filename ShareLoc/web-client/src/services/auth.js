import { request } from '../utils/request';

export const _signup = user => {
    return request('/signup', 'post', user);
};

export const _signin = credentials => {
    return request('/signin', 'post', credentials);
};
