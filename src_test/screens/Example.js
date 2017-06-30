import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight, StatusBar, Platform } from 'react-native';

class Example extends React.Component {

  static navigationOptions = ({state}) => {
    title: 'AAA'
    // header: ({ state }) => {
    //   return {
    //     style: { backgroundColor: state.params.config.color ? `rgba(${state.params.config.color}, 0.88)` : '#0288d1' },
    //     tintColor: '#ffffff',
    //   };
    // },
  };

  render() {
    const { state } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar
          animated
          backgroundColor={state.params.config.color ? `rgb(${state.params.config.color})` : '#0279ba'}
        />
        <state.params.component />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default Example;
