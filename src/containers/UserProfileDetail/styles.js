import { StyleSheet, Dimensions } from 'react-native';
// import { Styles, Fonts, Images, Colors, Metrics } from '@theme/';

var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    slider: {
        width: deviceWidth,
        marginBottom: 10,
        alignItems: 'center',
        resizeMode: 'contain'
    },
    description: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        marginTop: 50,
        marginBottom: 50
    },
    finding_buttonpanel: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    finding_buttongroup: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 25,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    selectBtn: {

    }
});
