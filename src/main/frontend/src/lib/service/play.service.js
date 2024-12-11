import config from '../../../config.js';

export const playService = {
    startPlaying,
    endPlaying,
    getGameData,
    getPlayStats,
    tag,
    getCurrentPlays
};

export default playService;

async function startPlaying(game, name) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: (name)
    };

    const response = await fetch(`${config.apiUrl}/play/start/${game}`, requestOptions);
    return handleResponse(response);
}

async function endPlaying(playerId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    };

    const response = await fetch(`${config.apiUrl}/play/end/${playerId}`, requestOptions);
    return handleResponse(response);
}

async function tag(player, tag) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    };

    // console.log(player, tag.hash);
    const response = await fetch(`${config.apiUrl}/play/${player}/tag/${tag.hash}`, requestOptions);
    return handleResponse(response);
}

async function getGameData(playerId) {
    const requestOptions = {
        method: 'GET',
    };

    const response = await fetch(`${config.apiUrl}/play/${playerId}`, requestOptions);
    return handleResponse(response);
}

async function getPlayStats(playerId) {
    const requestOptions = {
        method: 'GET',
    };

    const response = await fetch(`${config.apiUrl}/play/player/${playerId}`, requestOptions);
    return handleResponse(response);
}

async function getCurrentPlays(gameId) {
    const requestOptions = {
        method: 'GET',
    };

    const response = await fetch(`${config.apiUrl}/play/game/${gameId}`, requestOptions);
    return handleResponse(response);
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