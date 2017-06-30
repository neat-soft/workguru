import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View, Image, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';
import Styles from './styles'
import Strings from '../../string'
import ImageButton from '../../components/imagebutton/ImageButton';
import Types from '../../actions/actionTypes'
import global from '../../global'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import firebase from '../../firebase'
import Message from './Message'
import Typing from './Typing'
import TextArea from './TextArea'

const db = firebase.database();

export default class ChatScreen extends React.Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.id = null;
        this.hasReceivedInitalMessages = false;

        // Component refs
        this.listView = null;

        // Set firebase refs
        this.newMessageRef = db.ref(global.url.MESSAGE).orderByKey().limitToLast(1);
        this.messagesRef = db.ref(global.url.MESSAGE).orderByKey().limitToLast(50);

        // Keep a raw copy of the messages
        this.messages = {};

        // ListView DataSource instance
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1._key !== r2._key,
        });

        this.state = {
            listViewData: props.navigation.state.params.contacts,
            rowId: props.navigation.state.params.rowId,

            loading: true,
            dataSource: this.dataSource.cloneWithRows({}),
        };
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.chatContainer}>
                    <View style={Styles.contactContainer}>
                        <SwipeListView
                            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                            renderRow={ (data, secId, rowId, rowMap) => (
                                <TouchableHighlight
                                    onPress={ _ => this.setState({rowId: rowId}) }
                                    style={Styles.rowFront}
                                    underlayColor={'#EEE'}>
                                    <View>
                                        <Image style={Styles.circleImage} source={require('../../images/placeholder/profile.png')}/>
                                        {data.like === 2 ? <Image style={Styles.starImage} source={require('../../images/Star.png')}/> : null}
                                        {data.unread > 0 ?
                                            <View style={Styles.badgeImage}>
                                                <Text style={Styles.badgeText}>{data.unread}</Text>
                                            </View> : null}
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>
                    <View style={{width: 2, backgroundColor: '#ddd'}}/>
                    <View style={Styles.messageContainer}>
                        <ListView
                            ref={(r) => { this.listView = r; }}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.listView.scrollTo({ y: 0, animated: true });
                            }}
                            style={Styles.messages}
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={data => <Message id={this.id} message={data} />}
                        />
                        <Typing />
                    </View>
                </View>
                <View style={Styles.typeContainer}>
                    <TextArea
                        onSubmit={text => this.addMessage(text)}
                        onStartTyping={() => this.onStartTyping()}
                        onEndTyping={() => this.onEndTyping()}
                    />
                </View>
            </View>
        )
    }

    /**
     * On mount, get/set the users ID & proceed to load the
     * initial data.
     */
    componentDidMount() {
        this.messagesRef.once('value', this.onMessages);
    }

    /**
     * Remove any event listeners when the example is closed.
     */
    componentWillUnmount() {
        this.newMessageRef.off('child_added', this.onNewMessage);
    }

    /**
     * On new "child_added" events, append these to the list of messages
     * we current have. We must ignore the first event as it's triggered
     * instantly and we've already got the data from the messagesRef event
     * @param snapshot
     */
    onNewMessage = (snapshot) => {
        if (this.hasReceivedInitalMessages) {
            this.messages = {
                ...this.messages,
                [snapshot.key]: snapshot.val(),
            };
            console.log(this.messages);

            this.setState({
                dataSource: this.dataSource.cloneWithRows(this.messages),
            });
        }

        this.hasReceivedInitalMessages = true;
    };

    /**
     * Get the initial set of messages from the database. Once set,
     * subscribe to new "child_added" events.
     * @param snapshot
     */
    onMessages = (snapshot) => {
        console.log("snapshot")
        console.log(snapshot)
        let messages = {};

        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                messages = {
                    ...messages,
                    [childSnapshot.key]: childSnapshot.val(),
                };
            });
        }

        this.messages = messages;

        this.setState({
            loading: false,
            dataSource: this.dataSource.cloneWithRows(this.messages),
        }, () => {
            this.newMessageRef.on('child_added', this.onNewMessage);
        });
    };

    /**
     * Add a record to indicate the user is typing
     */
    onStartTyping() {
        firebase.database().ref(`${global.url.MESSAGE}/typing/${this.id}`).set(true);
    }

    /**
     * Remove the user from the typing records
     */
    onEndTyping() {
        firebase.database().ref(`${global.url.MESSAGE}/typing/${this.id}`).remove();
    }

    /**
     * Add a new message to firebase
     * @param text
     */
    addMessage(text) {
        const ref = firebase.database().ref(`${global.url.MESSAGE}`).push();
        ref.set({
            _id: this.id,
            _key: ref.key,
            _timestamp: Date.now(),
            text,
        });
    }
}

ChatScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

ChatScreen.navigationOptions = ({ navigation }) => {
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
            onPress={() => navigation.dispatch({ type: Types.HOME }) }/>,
        headerRight: null,
    }
};