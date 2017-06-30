import { StyleSheet } from 'react-native';
// import { Styles, Fonts, Images, Colors, Metrics } from '@theme/';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    containerMask: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    selectYou: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18
    },
    selectBtn: {
        margin: 15
    },
});
