import { StyleSheet, Dimensions } from 'react-native';
// import { Styles, Fonts, Images, Colors, Metrics } from '@theme/';

var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        backgroundColor:'#DBF9F4',
        flex:1
    },
    info: {
        // flex: 1,
    },
    info_name: {
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    info_description: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    photo: {
        flex: 1,
        marginLeft: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleInfoStyle: {
        fontSize: 12,
    },
    imageStyle:{
        marginLeft:15,
        marginRight:20,
        alignSelf:'center',
        width:20,
        height:24,
        justifyContent:'center'
    }
});
