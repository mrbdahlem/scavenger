import config from '../../../config.js';

export const playService = {
    startPlaying,
    endPlaying,
    getGameData,
    getPlayStats,
    tag
};

export default playService;

function startPlaying(game, name) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: (name)
    };

    return fetch(`${config.apiUrl}/play/start/${game}`, requestOptions).then(handleResponse);
}

function endPlaying(playerId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    };

    return fetch(`${config.apiUrl}/play/end/${playerId}`, requestOptions).then(handleResponse);
}

function tag(player, tag) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    };

    return fetch(`${config.apiUrl}/play/${player}/tag/${tag.hash}`, requestOptions).then(handleResponse);
}

function getGameData(playerId) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/play/${playerId}`, requestOptions).then(handleResponse);
}

function getPlayStats(playerId) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/play/player/${playerId}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}