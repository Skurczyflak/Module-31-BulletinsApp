import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getUser = ({ user }) => user.data;
export const getRequest = ({ user }) => user.request;

/* ACTIONS */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const GET_LOGGED_USER = createActionName('GET_LOGGED_USER');

/* ACTION CREATORS */
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const getLoggedUser = payload => ({ payload, type: GET_LOGGED_USER });

/* THUNK */
export const getLoggedUserRequest = () => {
    return async dispatch => {
        try{
            let res = await axios.get(`${API_URL}/auth/user`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch(getLoggedUser({ data: res.data}));
            dispatch(endRequest({name: 'GET_LOGGED_USER'}));
        }catch(err){
            dispatch(errorRequest({ name: 'GET_LOGGED_USER', error: err.message}));
        }
    }
}

/* INITIAL STATE */
const initialState = {
  data: null,
  request: { pending: false, error: null, success: null }
};

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case GET_LOGGED_USER:
            return action.payload;
        case START_REQUEST:
            return { ...statePart, request: { pending: true, error: null, success: false } };
        case END_REQUEST:
            return { ...statePart, request: { pending: false, error: null, success: true } };
        case ERROR_REQUEST:
            return { ...statePart, request: { pending: false, error: action.error, success: false } };
        default:
            return statePart;
    }
};