import { locationConstants } from './constants';
import { locationService } from './services';

export const locationActions = {
    getLocation,
    getLocationList,
    insertLocation,
    updateLocation,
    removeLocation
};

/**
 * 
 * @param {*} id 
 */
function getLocation(id) {
    return dispatch => {
        dispatch(request(id));

        locationService.getSingle(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: locationConstants.GET_LOCATION_REQUEST, id } }
    function success(result) { return { type: locationConstants.GET_LOCATION_SUCCESS, result } }
    function failure(error) { return { type: locationConstants.GET_LOCATION_FAILURE, error } }
}

/**
 * 
 * @param {*} idList 
 */
function getLocationList(idList) {
    return dispatch => {
        dispatch(request(idList));

        locationService.getList(idList)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(idList) { return { type: locationConstants.GET_LOCATION_LIST_REQUEST, idList } }
    function success(result) { return { type: locationConstants.GET_LOCATION_LIST_SUCCESS, result } }
    function failure(error) { return { type: locationConstants.GET_LOCATION_LIST_FAILURE, error } }
}

/**
 * 
 * @param {*} locationDoc 
 */
function insertLocation(locationDoc) {
    return dispatch => {
        dispatch(request(locationDoc));

        locationService.insert(locationDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(locationDoc) { return { type: locationConstants.INSERT_LOCATION_REQUEST, locationDoc } }
    function success(result) { return { type: locationConstants.INSERT_LOCATION_SUCCESS, result } }
    function failure(error) { return { type: locationConstants.INSERT_LOCATION_FAILURE, error } }
}

/**
 * 
 * @param {*} locationDoc 
 */
function updateLocation(locationDoc) {
    return dispatch => {
        dispatch(request(locationDoc));

        locationService.update(locationDoc)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(locationDoc) { return { type: locationConstants.UPDATE_LOCATION_REQUEST, locationDoc } }
    function success(result) { return { type: locationConstants.UPDATE_LOCATION_SUCCESS, result } }
    function failure(error) { return { type: locationConstants.UPDATE_LOCATION_FAILURE, error } }
}

/**
 * 
 * @param {*} id 
 */
function removeLocation(id) {
    return dispatch => {
        dispatch(request(id));

        locationService.remove(id)
            .then(
                result => {
                    dispatch(success(result));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: locationConstants.REMOVE_LOCATION_REQUEST, id } }
    function success(result) { return { type: locationConstants.REMOVE_LOCATION_SUCCESS, result } }
    function failure(error) { return { type: locationConstants.REMOVE_LOCATION_FAILURE, error } }
}