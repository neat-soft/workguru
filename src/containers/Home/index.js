import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View, Image, Alert, AsyncStorage } from 'react-native';
import Styles from './styles'
import Strings from '../../string'
import ImageButton from '../../components/imagebutton/ImageButton';
import Types from '../../actions/actionTypes'
import global from '../../global'
import storage from '../../storage'
import firebase from '../../firebase'
const db = firebase.database();

const CLICK_ID = {leftMenu: 1, rightMenu: 2, button1: 3, button2: 4, button3: 5, button4: 6, button5: 7, profile: 8};

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.searchUsers = this.searchUsers.bind(this);

        this.state = {
            isDiscovered: false,
            matchingUser: null
        };
    }

    componentDidMount() {
        this._loadStoreData().done();
    }

    async _loadStoreData() {
        storage.load({key: 'filter'}).then(ret => {
            global.filter.type_of_work = ret.type_of_work;
            global.filter.field_of_work = ret.field_of_work;
            global.filter.job_title = ret.job_title;
            global.filter.salary.from = parseInt(ret.salary.from);
            global.filter.salary.to = parseInt(ret.salary.to);
            global.filter.years_of_exp = parseInt(ret.years_of_exp);
            global.filter.skills = ret.skills;
            global.filter.age = parseInt(ret.age);
            global.filter.gender = parseInt(ret.gender);
            global.filter.nationality = ret.nationality;
            global.filter.distance = parseInt(ret.distance);
            global.filter.location = ret.location;

            if (isNaN(global.filter.salary.from)) global.filter.salary.from = 50000;
            if (isNaN(global.filter.salary.to)) global.filter.salary.to = 70000;
            if (isNaN(global.filter.years_of_exp)) global.filter.years_of_exp = 0;
            if (isNaN(global.filter.age)) global.filter.age = 30;
            if (isNaN(global.filter.gender)) global.filter.gender = 0;
            if (isNaN(global.filter.distance)) global.filter.distance = 80;

            this.searchUsers();
        });
    }

    searchUsers() {
        let _this = this;
        let ref = db.ref(global.url.USER);
        ref.orderByChild("age").equalTo(global.filter.age).on("child_added", function (snapshot) {
            console.log(snapshot.val());
            _this.setState({matchingUser: snapshot.val(), isDiscovered: true});
        })
    }

    render() {
        let view;
        if (this.state.isDiscovered) {
            view =
                <View style={Styles.finding_photo}>
                    <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(225, 249, 244, 0.7)'}}/>
                    <ImageButton style={{position: 'absolute'}}
                                 appearance={ {
                                     normal: require("../../images/placeholder/profile.png"),
                                     highlight: require("../../images/placeholder/profile.png")
                                 } }
                                 onPress={() => this.onClick(CLICK_ID.profile) }/>
                </View>;
        } else {
            view =
                <View style={{flex: 1}}>
                    <View style={Styles.finding1}>
                        <Image style={Styles.find1_image}>
                            <Text style={Styles.find1_text}>
                                {Strings.NOW_FINDING}
                            </Text>
                        </Image>
                    </View>
                    <View style={Styles.finding2}>
                        <Text style={Styles.find2_text1}>
                            ANNA SMITH
                        </Text>
                        <Text style={Styles.find2_text2}>
                            Design Director at Asia City Media Group
                        </Text>
                    </View>
                    <View style={Styles.finding_photo}>
                        <View style={{flex: 1}}/>
                        <Image style={{flex: 6, resizeMode: 'center'}} source={require('../../images/placeholder/profile image.png')} />
                    </View>
                </View>;
        }

        return (
            <View style={Styles.container}>
                {view}
                {/* Button Group */}
                <View style={Styles.finding_buttonpanel}>
                    <View style={Styles.finding_buttongroup}>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-backtrack-normal.png"),
                                highlight: require("../../images/Button/button-backtrack-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button1) }/>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-x-normal.png"),
                                highlight: require("../../images/Button/button-x-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button2) }/>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-boost-normal.png"),
                                highlight: require("../../images/Button/button-boost-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button3) }/>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-heart-normal.png"),
                                highlight: require("../../images/Button/button-heart-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button4) }/>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-star-normal.png"),
                                highlight: require("../../images/Button/button-star-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button5) }/>
                    </View>
                </View>
            </View>
        );
    }

    onClick(actionType) {
        let _this = this;
        switch (actionType) {
            case CLICK_ID.button4:
                if (this.state.isDiscovered && this.state.matchingUser !== null) {
                    let ref = db.ref(`${global.url.CONTACT}/${global.user.id}/${_this.state.matchingUser.id}`);
                    ref.update({like: 1, unread: 1});
                }
                break;
            case CLICK_ID.button5:
                if (this.state.isDiscovered && this.state.matchingUser !== null) {
                    let ref = db.ref(`${global.url.CONTACT}/${global.user.id}/${_this.state.matchingUser.id}`);
                    ref.update({like: 2, unread: 1});
                }
                break;
            case CLICK_ID.button1:
            case CLICK_ID.button2:
            case CLICK_ID.button3:
                if (this.state.isDiscovered) {
                    this.setState({ isDiscovered: false });
                }
                break;
            case CLICK_ID.profile:
                if (this.state.isDiscovered) {
                    this.props.navigation.dispatch({ type: Types.USER_PROFILE });
                }
                break;
        }
    }
}

HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        // header: () => ({
        //     title: <Image
        //         style={{margin: 5}}
        //         source={require('../../images/Button/button-discovery-normal.png')}/>
        // }),
        title: <Image
            style={{margin: 5}}
            source={require('../../images/Button/button-discovery-normal.png')}/>,
        headerLeft: <ImageButton
            style={{margin: 10}}
            appearance={ {
                normal: require("../../images/Button/button-Setting-disable.png"),
                highlight: require("../../images/Button/button-Setting-disable.png")
            } }
            onPress={() => navigation.dispatch({ type: Types.SETTING }) }/>,
        headerRight: <ImageButton
            style={{margin: 10}}
            appearance={ {
                normal: require("../../images/Button/button-chat-disable.png"),
                highlight: require("../../images/Button/button-chat-disable.png")
            } }
            onPress={() => navigation.dispatch({ type: Types.MESSAGE }) }/>,
    }
};