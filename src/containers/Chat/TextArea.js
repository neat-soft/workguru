import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Keyboard } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

class TextArea extends React.Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onStartTyping: PropTypes.func.isRequired,
    onEndTyping: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.typingTimeout = null;
    this.isTyping = false;
    this.state = {
      text: '',
    };
  }

  /**
   * Ensure the timeout doesn't trigger if the component
   * is unmounted
   */
  componentWillUnmount() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
  }

  /**
   * On submit reset the text, close the keybord
   * and pass the text back to the parent.
   */
  onSubmit() {
    const text = this.state.text;
    if (text) {
      this.props.onSubmit(this.state.text);
      this.updateText('');
      Keyboard.dismiss();
    }
  }

  /**
   * Update the current input text
   * @param text
   */
  updateText(text) {
    this.setState({ text });

    if (text) {
      if (!this.isTyping) this.props.onStartTyping();
      this.isTyping = true;
      if (this.typingTimeout) clearTimeout(this.typingTimeout);

      this.typingTimeout = setTimeout(() => {
        this.isTyping = false;
        this.props.onEndTyping();
      }, 2000);
    } else {
      this.isTyping = false;
      clearTimeout(this.typingTimeout);
      this.props.onEndTyping();
    }
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textAreaContainer}>
          <TextInput
            multiline
            placeholder={'Write a message...'}
            onChangeText={text => this.updateText(text)}
            value={this.state.text}
            style={styles.textInput}
          />
        </View>
        <View style={styles.submitContainer}>
          <TouchableHighlight
            style={styles.submitTouchable}
            onPress={() => this.onSubmit()}
          >
            <View style={styles.submitButton}>
              {/*<Icon*/}
                {/*name={'send'}*/}
                {/*size={20}*/}
                {/*color={'#ffffff'}*/}
              {/*/>*/}
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
  },
  textAreaContainer: {
    flex: 8,
  },
  textInput: {
    marginHorizontal: 8,
    flex: 1,
    height: 65,
  },
  submitContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitTouchable: {
    borderRadius: 23,
  },
  submitButton: {
    elevation: 1,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TextArea;
