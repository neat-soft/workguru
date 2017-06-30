import { StyleSheet, Dimensions } from 'react-native';

var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    contactContainer: {
        width: 80,
        backgroundColor: '#F1F9F4',
    },
    rowFront: {
        alignItems: 'center',
        borderBottomColor: '#F8FEFD',
        borderBottomWidth: 1,
        justifyContent: 'center',
        width: 80,
        height: 80,
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
    },
    messageContainer: {
        flex: 1
    },
    messages: {
        flex: 1,
    },
    typeContainer: {
    }
});
