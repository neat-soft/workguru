import { StyleSheet, Dimensions } from 'react-native';
// import { Styles, Fonts, Images, Colors, Metrics } from '@theme/';

var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    finding1: {
        flex: 1.3,
        backgroundColor: 'rgba(253,239,218,0.7)',
    },
    find1_image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    find1_text: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    finding2: {
        flex: 1,
    },
    find2_text1: {
        marginTop: 60,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    find2_text2: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    finding_photo: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    finding_buttonpanel: {
        position: 'absolute',
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
