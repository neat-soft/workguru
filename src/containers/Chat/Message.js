import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import moment from 'moment';

function showDetails(message) {
  Alert.alert('Message Details', `Sent: ${moment.unix(message._timestamp / 1000).format('Do MMMM YYYY HH:mm')}`)
}

function Message({ id, message }) {
  const { _id, text } = message;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.messageText, id === _id ? styles.selfMessage : null]}
        onLongPress={() => {
          showDetails(message);
        }}
      >
        {text}
      </Text>
    </View>
  );
}

Message.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  messageText: {
    marginRight: 32,
    elevation: 1,
    padding: 8,
    borderRadius: 3,
    alignSelf: 'flex-start',
    backgroundColor: '#dddddd',
  },
  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#eeeeee',
    marginRight: 0,
    marginLeft: 32,
  },
});

export default Message;
