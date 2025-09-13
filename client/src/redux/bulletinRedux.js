import axios from 'axios';
import { API_URL } from '../config';
/* SELECTORS */

export const getBulletins = ({bulletins}) => bulletins.data;
export const getRequest = ({bulletins}) => bulletins.request;
export const getBulletin = ({bulletins}) => bulletins.single;

/* ACTIONS */

const reducerName = 'bulletins';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_BULLETINS = createActionName('LOAD_BULLETINS');
const GET_BULLETIN_BY_ID = createActionName('GET_BULLETIN_BY_ID');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const loadBulletins = payload => ({ payload, type: LOAD_BULLETINS });
export const getBulletinById = payload => ({ payload, type: GET_BULLETIN_BY_ID });
/* THUNKS */

export const loadBulletinsRequest = () => {
    return async dispatch => {
        dispatch(startRequest({name: 'LOAD_BULLETINS'}));
        try{
            let res = await axios.get(`${API_URL}/bulletins`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            dispatch(loadBulletins(res.data));
            dispatch(endRequest({name: 'LOAD_BULLETINS'}));
        }catch(err){
            dispatch(errorRequest({ name: 'LOAD_BULLETINS', message: err.message}));
        }
    }
};

export const getBulletinByIdRequest = id => {
    return async dispatch => {
        dispatch(startRequest({name: 'GET_BULLETIN_BY_ID'}));
        try{
            let res = await axios.get(`${API_URL}/bulletins/${id}`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            dispatch(getBulletinById(res.data));
            dispatch(endRequest({name: 'GET_BULLETIN_BY_ID'}));
        }catch(err){
            dispatch(errorRequest({ name: 'GET_BULLETIN_BY_ID', message: err.message}));
        }
    }
};


/* INITIAL STATE */

const initialState = {
  data: [],
  single: {},
  searchResults: [],
  request: { pending: false, error: null, success: false }
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch(action.type) {
    case LOAD_BULLETINS:
        return { ...statePart, data: [...action.payload] };
    case GET_BULLETIN_BY_ID:
        return { ...statePart, single: action.payload };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: false } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };
    default:
      return statePart;
    }
}