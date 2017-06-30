import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import SelectScreen from '../containers/UserTypeSelection';
import LoginScreen from '../containers/TutorialAndLogin';
import HomeScreen from '../containers/Home';
import UserProfileScreen from '../containers/UserProfileDetail';
import SettingScreen from '../containers/Setting';
import EditInfoScreen from '../containers/EditInfo';
import ProfilePreviewScreen from '../containers/ProfilePreview';
import MessageScreen from '../containers/Message';
import ChatScreen from '../containers/Chat';

export const AppNavigator = StackNavigator({
    Select: {screen: SelectScreen},
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen},
    UserProfile: {screen: UserProfileScreen},
    Setting: {screen: SettingScreen},
    EditInfo: {screen: EditInfoScreen},
    ProfilePreview: {screen: ProfilePreviewScreen},
    Message: {screen: MessageScreen},
    Chat: {screen: ChatScreen},
}, {
    navigationOptions: {
    }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
