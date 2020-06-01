import request from '../utils/request';

export const getAll = (page, pageSize, name, gameModes) => {
    return request.get(
        `/configs?page=${page}&pageSize=${pageSize}&name=${name}&gameModes=${gameModes}`
    );
};

export const create = config => {
    return request.post('/configs', config);
};

export const getById = configId => {
    return request.get(`/configs/${configId}`);
};

export const updateById = config => {
    return request.put(`/configs/${config.id}`, config);
};

export const addZone = (idConfig, zone) => {
    return request.post(`/configs/${idConfig}/areas`, zone);
};

export const getAreas = idConfig => {
    return request.get(`/configs/${idConfig}/areas`);
};

export const getFlags = idConfig => {
    return request.get(`/configs/${idConfig}/flags`);
};

export const addFlag = (idConfig, flag) => {
    return request.post(`/configs/${idConfig}/flags`, flag);
};

export const removeFlags = idConfig => {
    return request.delete(`/configs/${idConfig}/flags`);
};

export const removeZones = idConfig => {
    return request.delete(`/configs/${idConfig}/areas`);
};

export const removeConfiguration = idConfig => {
    return request.delete(`/configs/${idConfig}`);
};

export const cloneConfiguration = idConfig => {
    return request.post(`/configs/${idConfig}/clone`);
};

export const exportConfiguration = idConfig => {
    return request.get(`/configs/${idConfig}/export`, { responseType: 'blob' });
};

export const getTeams = idConfig => {
    return request.get(`/configs/${idConfig}/teams`);
};

export const createTeam = (idConfig, credentials) => {
    return request.post(`/configs/${idConfig}/teams`, credentials);
};

export const updateTeam = (idConfig, idTeam, team) => {
    return request.put(`/configs/${idConfig}/teams/${idTeam}`, team);
};

export const removeTeam = (idConfig, idTeam) => {
    return request.delete(`/configs/${idConfig}/teams/${idTeam}`);
};
export const addItem = (idConfig, item) => {
    return request.post(`/configs/${idConfig}/items`, {
        quantity: item.quantity,
        coordinates: [item.position.lat, item.position.lng],
        name: item.name,
        visibilityRadius: item.visibilityRadius,
        actionRadius: item.actionRadius,
        waitingPeriod: item.waitingPeriod,
        autoMove: item.autoMove,
        effectDuration: item.effectDuration,
        effectStrength: item.effectStrength
    });
};

export const updateItem = (idConfig, idItem, item) => {
    return request.put(`/configs/${idConfig}/items/${idItem}`, item);
};

export const getItems = idConfig => {
    return request.get(`/configs/${idConfig}/items`);
};

export const removeItems = idConfig => {
    return request.delete(`/configs/${idConfig}/items`);
};

export const addMember = (idConfig, idTeam, username) => {
    return request.post(`/configs/${idConfig}/teams/${idTeam}/users`, {
        username: username
    });
};

export const removeMember = (idConfig, idTeam, idUser) => {
    return request.delete(
        `/configs/${idConfig}/teams/${idTeam}/users/${idUser}`
    );
};

export const getUsers = username => {
    return request.get(`/users?username=${username}`);
};

export const addItemsModel = (idConfig, model) => {
    return request.post(`/configs/${idConfig}/item-models`, model);
};

export const updateItemsModel = (idConfig, idModelItem, modelItem) => {
    const i = JSON.parse(JSON.stringify(modelItem));
    delete i.name;
    return request.put(`/configs/${idConfig}/item-models/${idModelItem}`, i);
};

export const deleteItemsModel = (idConfig, idModelItem) => {
    return request.delete(`/configs/${idConfig}/item-models/${idModelItem}`);
};

export const getItemsModel = idConfig => {
    return request.get(`/configs/${idConfig}/item-models`);
};
