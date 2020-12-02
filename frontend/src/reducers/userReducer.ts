import { actions } from "../actions/types";

const initialState = {
    list: []
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case actions.FETCH_USERS:
            return {
                ...state,
                list: action.payload.list
            }
        case actions.EDIT_USER:
            let { list } = state;
            const otherUsers = list.filter((u: any) => u.id !== action.payload.user.id);
            return {
                ...state,
                list: [action.payload.user, ...otherUsers]
            }
        case actions.DELETE_USER:
            let { list: users } = state;
            const remainingUsers = users.filter((u: any) => u.id !== action.payload.id);
            return {
                ...state,
                list: remainingUsers
            }
        default:
            return state;
    }
}