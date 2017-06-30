import types from '../actions/actionTypes';

const initialAuthState = { isLoggedIn: false };

export default function auth(state = initialAuthState, action) {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, isLoggedIn: true };
        case types.LOGOUT:
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
}