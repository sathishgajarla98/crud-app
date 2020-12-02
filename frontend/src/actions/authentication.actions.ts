import { Dispatch } from 'redux';
import { actions } from '../actions/types';
import { axiosInstance } from '../utils/axios.utils';

export const authenticate = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await axiosInstance.post('/api/auth/local', { username, password });
            console.log(result)
            const {
                data
            } = result.data;
            return dispatch({
                type: actions.LOGIN,
                payload: { user:data, loading: false, errorMessage: null }
            });
        } catch (err) {
            console.log(err)
            let error = { message: '' };
            if (err.response) {
                const { data } = err.response;
                error = { message: data.message };
            } else if (err.request) {
                error = { message: 'Network Unreachable' };
            }
            return dispatch({ payload: { errorMessage: error.message }, type: actions.LOGIN });
        }
    };
};


export const logout = () => {
    return async (dispatch: Dispatch) => {
        try {
            await axiosInstance.post('/api/auth/logout');

            return dispatch({
                type: actions.LOGOUT,
                payload: {}
            });
        } catch (err) {
            let error = { message: '' };
            if (err.response) {
                const { data } = err.response;
                error = { message: data.message };
            } else if (err.request) {
                error = { message: 'Network Unreachable' };
            }
            return dispatch({ payload: { errorMessage: error.message }, type: actions.LOGOUT });
        }
    };
};