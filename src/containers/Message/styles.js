import { StyleSheet, Dimensions } from 'react-native';

var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#F1F9F4',
        borderBottomColor: '#F8FEFD',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 80,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#F1F9F4',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    deleteBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'red',
        right: 0,
        top: 0,
        width: 100
    },
    backTextWhite: {
        color: '#FFF'
    },
    listItem: {
        flex: 1,
        flexDirection: 'row'
    },
    circleImage: {
        alignSelf: 'center',
        height: 60,
        borderRadius: 30,
        width: 60,
        margin: 10
    },
    starImage: {
        position: 'absolute',
        marginTop:50,
        marginLeft: 8,
        width: 20
    },
    badgeImage: {
        position: 'absolute',
        marginLeft: 53,
        marginTop: 10,
        borderRadius: 9,
        backgroundColor: '#F59F30',
        width: 18,
        height: 18
    },
    badgeText: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 11
    }
});
