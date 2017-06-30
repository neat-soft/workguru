import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableHighlight, StatusBar, Platform } from 'react-native';
import examples from '../examples';

class Overview extends React.Component {

  static navigationOptions = {
    title: 'Examples',
    // header: {
    //   style: { backgroundColor: '#0288d1' },
    //   tintColor: '#ffffff',
    // },
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar
          animated
          backgroundColor="#0279ba"
        />
        <ScrollView>
          {Object.keys(examples).map((key) => {
            const example = examples[key];

            const { name, description } = example.config;

            if (!name) {
              return null;
            }

            console.log(example)
            return (
              <TouchableHighlight
                key={key}
                underlayColor={'rgba(0, 0, 0, 0.054)'}
                onPress={() => {
                  navigate('Example', {
                    component: example.default,
                    config: example.config,
                  });
                }}
              >
                <View
                  style={styles.row}
                >
                  <Text style={styles.name}>{name}</Text>
                  <Text
                    style={styles.description}
                    numberOfLines={1}
                  >
                    {description}
                  </Text>
                </View>
              </TouchableHighlight>

            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row: {
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  name: {
    fontWeight: '800',
    fontSize: 16,
  },
  description: {
    fontSize: 11,
  },
});

export default Overview;
