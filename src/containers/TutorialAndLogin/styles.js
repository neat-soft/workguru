import { StyleSheet, Dimensions } from 'react-native';
// import { Styles, Fonts, Images, Colors, Metrics } from '@theme/';

var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        marginTop: 40,
        marginBottom: 30,
        alignItems: 'center'
    },
    slider: {
        width: deviceWidth - 40,
        height: '100%',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        resizeMode: 'center'
    },
    sliderText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 20
    },
    selectBtn: {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 35,
    }
});
