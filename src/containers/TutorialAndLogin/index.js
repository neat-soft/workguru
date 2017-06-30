import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Styles from './styles'
import Strings from '../../string'
import ViewPager from '../../components/viewpager'
import ImageButton from '../../components/imagebutton/ImageButton';
import Types from '../../actions/actionTypes'
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager, AccessToken
} = FBSDK;
import firebase from '../../firebase'
const db = firebase.database();
import global from '../../global'
import storage from '../../storage'

const guideImages = [
    {image: require("../../images/Group 4.png"), text: Strings.GUIDE1},
    {image: require("../../images/Group.png"), text: Strings.GUIDE2},
    {image: require("../../images/Group 2.png"), text: Strings.GUIDE3},
];

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        const dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.state = {
            dataSource: dataSource.cloneWithPages(guideImages),
            userType: props.navigation.state.params.userType,
        };
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.logo}>
                    <Image source={require('../../images/work-guru-logo-login.png')}/>
                </View>
                <ViewPager
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}/>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>

                    <ImageButton
                        style={ Styles.selectBtn }
                        appearance={ {
                            normal: require("../../images/Button/button Login FB-normal.png"),
                            highlight: require("../../images/Button/button Login FB-presed.png")
                        } }
                        onPress={() => this.loginWithFB() }/>
                    <ImageButton
                        style={ Styles.selectBtn }
                        appearance={ {
                            normal: require("../../images/Button/button_Login IN-normal.png"),
                            highlight: require("../../images/Button/button_Login IN-pressed.png")
                        } }
                        onPress={() => this.loginWithLI() }/>
                </View>
            </View>
        );
    }

    _renderPage(data: Object, pageID: number | string) {
        return (
            <Image
                source={data.image}
                style={Styles.slider}>
                <Text style={Styles.sliderText}>
                    {data.text}
                </Text>
            </Image>
        );
    }

    loginWithFB() {
        const _this = this;
        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    return Promise.resolve('cancelled');
                }
                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
                // get the access token
                return AccessToken.getCurrentAccessToken();
            })
            .then(data => {
                // create a new firebase credential with the token
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                _this.fetchFBUser(data.accessToken);
                // login with credential
                return firebase.auth().signInWithCredential(credential);
            })
            .then((currentUser) => {
                if (currentUser === 'cancelled') {
                    console.log('Login cancelled');
                } else {
                    // now signed in
                    console.warn(JSON.stringify(currentUser.toJSON()));
                }
            })
            .catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
    }

    loginWithLI() {
        global.user.name = 'Test User';
        global.user.id = 'test_id';
        global.user.email = 'test@test.com';
        this.syncUser();
    }

    fetchFBUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                global.user.name = json.name;
                global.user.id = json.id;
                global.user.email = json.email;
                global.user.access_token = token;

                this.syncUser();
            })
            .catch(() => {
                alert('ERROR GETTING DATA FROM FACEBOOK')
            });
    }

    syncUser() {
        global.user.type = this.state.userType;
        let data = {id: global.user.id, email: global.user.email, type: global.user.type}
        storage.save({key: 'user', data: data});

        let _this = this;
        let ref = db.ref(`${global.url.USER}/${global.user.id}`);
        ref.once('value', function(snapshot) {
            if (snapshot.val() === null) {
                ref.update(global.user);
            } else {
                global.user = snapshot.val();
            }
            _this.syncProfile();
        });
    }

    syncProfile() {
        let _this = this;
        let ref = db.ref(`${global.url.PROFILE}/${global.user.id}`);
        ref.once('value', function(snapshot) {
            if (snapshot.val() === null) {
                ref.update(global.profile);
            } else {
                global.profile = snapshot.val();
            }
            _this.props.navigation.dispatch({type: Types.HOME});
        });
    }
}

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
    header: null
};
