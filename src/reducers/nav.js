import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import types from '../actions/actionTypes';

const selectAction = AppNavigator.router.getActionForPathAndParams('Select');
const selectState = AppNavigator.router.getStateForAction(selectAction);
const initialNavState = AppNavigator.router.getStateForAction(
    selectState
);

export default function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case types.LOGIN:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Login', params: {userType: action.userType} }),
                state
            );
            break;
        case types.HOME:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Home' }),
                state
            );
            break;
        case types.USER_PROFILE:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'UserProfile' }),
                state
            );
            break;
        case types.SETTING:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Setting' }),
                state
            );
            break;
        case types.EDIT_INFO:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'EditInfo' }),
                state
            );
            break;
        case types.PROFILE_PREVIEW:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'ProfilePreview' }),
                state
            );
            break;
        case types.MESSAGE:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Message' }),
                state
            );
            break;
        case types.CHAT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Chat', params: {contacts: action.contacts, rowId: action.rowId} }),
                state
            );
            break;
        case types.BACK:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case types.LOGOUT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}