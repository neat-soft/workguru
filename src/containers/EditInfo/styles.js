import { StyleSheet, Dimensions } from 'react-native';
// import { Styles, Fonts, Images, Colors, Metrics } from '@theme/';

var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#DBF9F4',
    },
    containerPhoto: {
        margin: 20
    },
    photo: {
        alignItems: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
        width: 300,
        height: 300
    },
    photoCandidatesGroup: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
    },
    photoCandidates: {
        flex: 1,
        borderRadius: 10,
        resizeMode: 'contain',
        margin: 10,
        width: 100,
        height: 100
    },
    titleInfoStyle: {
        fontSize: 12,
    },
});
