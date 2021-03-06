import { companyConstants } from './constants';

export function company(state = {}, action) {
    switch(action.type) {
        case companyConstants.GET_COMPANY_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case companyConstants.GET_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                company: action.result
            });
        case companyConstants.GET_COMPANY_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });


        
        case companyConstants.GET_COMPANY_PAGE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case companyConstants.GET_COMPANY_PAGE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                companies: action.result
            });
        case companyConstants.GET_COMPANY_PAGE_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });


        
        case companyConstants.GET_COMPANY_LIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case companyConstants.GET_COMPANY_LIST_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case companyConstants.GET_COMPANY_LIST_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case companyConstants.INSERT_COMPANY_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case companyConstants.INSERT_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case companyConstants.INSERT_COMPANY_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        case companyConstants.UPDATE_COMPANY_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case companyConstants.UPDATE_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case companyConstants.UPDATE_COMPANY_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });

        

        case companyConstants.PARTIAL_UPDATE_COMPANY_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case companyConstants.PARTIAL_UPDATE_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                partialUpdateResult: action.result
            });
        case companyConstants.PARTIAL_UPDATE_COMPANY_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });



        case companyConstants.REMOVE_COMPANY_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case companyConstants.REMOVE_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                loading: false
            });
        case companyConstants.REMOVE_COMPANY_FAILURE:
            return Object.assign({}, state, {
                loading: false
            });    

        default:
            return state;
    }
}