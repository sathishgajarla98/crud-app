import { Dispatch } from 'redux';
import { actions } from '../actions/types';
import { axiosInstance } from '../utils/axios.utils';

export const fetchUsers = () => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await axiosInstance.get('/api/users');
            console.log(result)
            const {
               data
            } = result.data;

            return dispatch({
                type: actions.FETCH_USERS,
                payload: { list:data, loading:false, errorMessage:null }
            });
        } catch (err) {
            let error = {message:''};
            if (err.response) {
                const { data } = err.response;
                error = { message: data.message };
            } else if (err.request) {
                error = { message: 'Network Unreachable' };
            }
            return dispatch({ payload: { loading:false, errorMessage: error.message }, type: actions.FETCH_USERS });
        }
    };
};

export const editUser = (user: any) => (dispatch: Dispatch) => dispatch({
    type: actions.EDIT_USER,
    payload: { user, edited: true }
})

export const deleteUser = (id: number) => (dispatch: Dispatch) => dispatch({
    type: actions.DELETE_USER,
    payload: { deleted: true, id }
})