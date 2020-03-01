export const locationService = {
    getSingle,
    getList,
    insert,
    update,
    remove
};

/**
 * Holds configuration info for interacting with any attached APIs.
 */
const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001'
};

/**
 * 
 * @param {*} id 
 */
function getSingle(id) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/table/${id}`, requestOptions).then(handleResponse);
};

/**
 * 
 * @param {*} idList 
 */
function getList(idList) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${config.apiUrl}/table/${idList}`, requestOptions).then(handleResponse);
};

/**
 * 
 * @param {*} locationDoc 
 */
function insert(locationDoc) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(locationDoc)
    };

    return fetch(`${config.apiUrl}/table`, requestOptions).then(handleResponse);
};

/**
 * 
 * @param {*} locationDoc 
 */
function update(locationDoc) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(locationDoc)
    };

    return fetch(`${config.apiUrl}/table`, requestOptions).then(handleResponse);
};

/**
 * 
 * @param {*} id 
 */
function remove(id) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(id)
    };

    return fetch(`${config.apiUrl}/table`, requestOptions).then(handleResponse);
};


/**
 * 
 * @param {*} response 
 */
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // authenticationService.logout();
                Location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}