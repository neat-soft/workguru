import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View, Image, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';
import Styles from './styles'
import Strings from '../../string'
import ImageButton from '../../components/imagebutton/ImageButton';
import Types from '../../actions/actionTypes'
import global from '../../global'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import firebase from '../../firebase'

const db = firebase.database();

export default class MessageScreen extends React.Component {

    constructor(props) {
        super(props);

        _this = this;
        let ref = db.ref(`${global.url.CONTACT}/${global.user.id}`);
        ref.once('value', function(snapshot) {
            if (snapshot.val() !== null) {
                _this.setState({listViewData: snapshot.val()});

                for (key in snapshot.val()) {
                    db.ref(`${global.url.USER}/${key}`).once('value', function (snapshot) {
                        if (snapshot.val() !== null) {
                            let data = _this.state.listViewData;
                            data[key].user = snapshot.val();
                            _this.setState({listViewData: data});
                        }
                    });
                    db.ref(`${global.url.PROFILE}/${key}`).once('value', function (snapshot) {
                        if (snapshot.val() !== null) {
                            let data = _this.state.listViewData;
                            data[key].profile = snapshot.val();
                            _this.setState({listViewData: data});
                        }
                    });
                }
            }
        });

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listViewData: {}
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = this.state.listViewData;
        if (newData.hasOwnProperty(rowId))
            delete newData[rowId];
        this.setState({listViewData: newData});

        db.ref(`${global.url.CONTACT}/${global.user.id}/${rowId}`).remove(function(error) {
            console.log(rowId + "cannot remove " + rowId + " from contact");
        });
    }

    toChatScreen(rowId) {
        this.props.navigation.dispatch({ type: Types.CHAT, contacts: this.state.listViewData, rowId: rowId });
    }

    render() {
        return (
            <View style={Styles.container}>
                <SwipeListView
                    dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                    renderRow={ (data, secId, rowId, rowMap) => (
                        <SwipeRow
                            disableRightSwipe={true}
                            rightOpenValue={-100}>
                            <View style={Styles.rowBack}>
                                <TouchableOpacity style={Styles.deleteBtn} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
                                    <Text style={Styles.backTextWhite}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableHighlight
                                onPress={ _ => this.toChatScreen(rowId) }
                                style={Styles.rowFront}
                                underlayColor={'#EEE'}>
                                <View style={Styles.listItem}>
                                    <View>
                                        <Image style={Styles.circleImage} source={require('../../images/placeholder/profile.png')}/>
                                        {data.like === 2 ? <Image style={Styles.starImage} source={require('../../images/Star.png')}/> : null}
                                        {data.unread > 0 ?
                                            <View style={Styles.badgeImage}>
                                                <Text style={Styles.badgeText}>{data.unread}</Text>
                                            </View> : null}
                                    </View>
                                    <View style={{flex: 1, alignSelf: 'center'}}>
                                        {console.log(data)}
                                        <Text style={{marginBottom: 3}}>{data.user !== undefined ? data.user.name : ''}</Text>
                                        <Text style={{fontSize: 11}}>{data.profile !== undefined ? data.profile.current_work : ''}</Text>
                                        <Text style={{fontSize: 11}}>{data.profile !== undefined ? data.profile.years_of_exp + ' Years Experience' : ''}</Text>
                                    </View>
                                    <Text style={{marginTop: 20, marginRight: 10, fontSize: 11, color: '#aaa'}}>17:34</Text>
                                </View>
                            </TouchableHighlight>
                        </SwipeRow>
                    )}
                />
            </View>
        )
    }
}

MessageScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

MessageScreen.navigationOptions = ({ navigation }) => {
    return {
        title: <Image
            style={{margin: 5}}
            source={require('../../images/Button/button-chat-disable.png')}/>,
        headerLeft: <ImageButton
            style={{margin: 10}}
            appearance={ {
                normal: require("../../images/Button/button-discovery-normal.png"),
                highlight: require("../../images/Button/button-discovery-pressed.png")
            } }
            onPress={() => navigation.dispatch({ type: Types.BACK }) }/>,
        headerRight: null,
    }
};