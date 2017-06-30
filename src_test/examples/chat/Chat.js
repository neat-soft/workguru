import React from 'react';
import { ScrollView, View, Text, ListView, StyleSheet } from 'react-native';
import { randomString } from '../../utils';
import firebase from '../../firebase';
import Message from '../../../src/containers/Chat/Message';
import TextArea from '../../../src/containers/Chat/TextArea';
import Typing from '../../../src/containers/Chat/Typing';

const REF = 'examples/chat';
const ID = '@Examples:Chat:id';

class Chat extends React.Component {

  constructor() {
    super();

    this.id = null;
    this.hasReceivedInitalMessages = false;

    // Component refs
    this.listView = null;

    // Set firebase refs
    this.newMessageRef = firebase.database().ref(`${REF}/messages`).orderByKey().limitToLast(1);
    this.messagesRef = firebase.database().ref(`${REF}/messages`).orderByKey().limitToLast(50);

    // Keep a raw copy of the messages
    this.messages = {};

    // ListView DataSource instance
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1._key !== r2._key,
    });

    // Initial State
    this.state = {
      loading: true,
      dataSource: this.dataSource.cloneWithRows({}),
    };
  }

  /**
   * On mount, get/set the users ID & proceed to load the
   * initial data.
   */
  componentDidMount() {
    return
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

      this.setState({
        dataSource: this.dataSource.cloneWithRows(this.messages),
      });
    }

    this.hasReceivedInitalMessages = true;
  };

  /**
   * Get the inital set of messages from the database. Once set,
   * subscribe to new "child_added" events.
   * @param snapshot
   */
  onMessages = (snapshot) => {
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
    firebase.database().ref(`${REF}/typing/${this.id}`).set(true);
  }

  /**
   * Remove the user from the typing records
   */
  onEndTyping() {
    firebase.database().ref(`${REF}/typing/${this.id}`).remove();
  }

  /**
   * Add a new message to firebase
   * @param text
   */
  addMessage(text) {
    const ref = firebase.database().ref(`${REF}/messages`).push();
    ref.set({
      _id: this.id,
      _key: ref.key,
      _timestamp: Date.now(),
      text,
    });
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
      <View style={styles.container}>
        <ListView
          ref={(r) => { this.listView = r; }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.listView.scrollTo({ y: contentHeight, animated: true });
          }}
          style={styles.messages}
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={data => <Message id={this.id} message={data} />}
        />
        <Typing />
        <TextArea
          onSubmit={text => this.addMessage(text)}
          onStartTyping={() => this.onStartTyping()}
          onEndTyping={() => this.onEndTyping()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    flex: 1,
  },
});

export default Chat;
