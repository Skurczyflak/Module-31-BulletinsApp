
/* SELECTORS */
export const getUser = ({ user }) => user.data;
export const getRequest = ({ user }) => user.request;

/* ACTIONS */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

/* ACTION CREATORS */
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const logIn = (payload) => ({ payload, type: LOG_IN });
export const logOut = () => ({ type: LOG_OUT });

/* INITIAL STATE */
const initialState = {
  data: null,
  request: { pending: false, error: null, success: null }
};

/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
        case LOG_IN:
            return { data: action.payload };
        case LOG_OUT:
            return { data: null };
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