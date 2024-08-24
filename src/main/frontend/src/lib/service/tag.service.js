import config from '../../../config.js';
import { authHeader } from '../utils.ts';

export const tagService = {
    loadTag,
    saveTag
};

export default tagService;

function loadTag(hash) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/tag/public/${hash}`, requestOptions).then(handleResponse);
}

function saveTag(tag) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(tag)
    };
    console.log("saving", tag)
    return fetch(`${config.apiUrl}/tag/${tag.hash}`, requestOptions).then(handleResponse);
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