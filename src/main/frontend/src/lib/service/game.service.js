import config from '../../../config.js';
import { authHeader } from '../utils.ts';

export const gameService = {
    gamesList,
    saveGame,
    loadGame,
    addTask,
    getTasks
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

    if (!game.id || game.id === "new" || game.id < 0 ) {
        return createGame(game);
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(game)
    };

    return fetch(`${config.apiUrl}/games/` + game.id, requestOptions).then(handleResponse);
}

function createGame(game) {
    game.id = -1;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(game)
    };

    return fetch(`${config.apiUrl}/games/new`, requestOptions).then(handleResponse);
}

function addTask(gameId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/games/${gameId}/newTask`, requestOptions).then(handleResponse);
}

function getTasks(gameId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/games/${gameId}/tasks`, requestOptions).then(handleResponse);
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