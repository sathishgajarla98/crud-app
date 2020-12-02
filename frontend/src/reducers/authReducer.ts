import { actions } from "../actions/types";

const initialState = {
    isAuthenticated: false
}

export default function(state = initialState, action:any){
    switch(action.type){
        case actions.LOGIN:
            if(action.payload.errorMessage){
                return {
                    ...state,
                    isAuthenticated: false,
                    errorMessage: action.payload.errorMessage
                }
            }
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                permissions: action.payload.user.permissions,
                errorMessage:null
            }
        case actions.LOGOUT:
            if(action.payload.errorMessage){
                return {
                    ...state,
                    errorMessage:action.payload.errorMessage
                }
            }
            return {
                ...state,
                permissions:{},
                isAuthenticated: false
            }
        default:
            return state;
    }
}