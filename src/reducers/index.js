import { combineReducers } from 'redux';

import nav from './nav'
import auth from './auth'

const appReducers = {
    nav,
    auth
};

export default combineReducers(appReducers);
