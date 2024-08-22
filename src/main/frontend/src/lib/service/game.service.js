import config from '../../../config.js';
import { authHeader } from '../utils.ts';

export const gameService = {
    gamesList,
    saveGame,
    loadGame
};

function gamesList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/games`, requestOptions).then(handleResponse);
}

function loadGame(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/games/${id}`, requestOptions).then(handleResponse);
}

function saveGame(game) {

    if (!game.id) {
        return createGame(game);
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(game)
    };

    return fetch(`${config.apiUrl}/games`, requestOptions).then(handleResponse);
}

function createGame(game) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(game)
    };

    return fetch(`${config.apiUrl}/games/new`, requestOptions).then(handleResponse);
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