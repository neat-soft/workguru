import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from '../../../src_test/firebase';
import global from '../../global'

class Typing extends React.Component {

    constructor() {
        super();
        this.typingRef = firebase.database().ref(`${global.url.MESSAGE}/typing`);
        this.state = {
            typing: 0,
        };
    }

    componentDidMount() {
        this.typingRef.on('value', this.onTypingChange);
    }

    componentWillUnmount() {
        this.typingRef.off('value');
    }

    /**
     * @param snapshot
     */
    onTypingChange = (snapshot) => {
        this.setState({
            typing: Object.keys(snapshot.val() || {}).length,
        });
    };

    render() {
        const typing = this.state.typing;

        if (!typing) {
            return null;
        }

        return (
            <View>
                <Text style={styles.text}>{`${typing} user${typing > 1 ? 's' : ''} ${typing === 1 ? 'is' : 'are'} typing`}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontSize: 12,
        alignSelf: 'center',
    },
});

export default Typing;
