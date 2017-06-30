import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import ImageButton from '../../components/imagebutton/ImageButton';
import Styles from './styles'
import Types from '../../actions/actionTypes'
import Strings from '../../string'

export default class SelectScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.container}>
                <Image style={[Styles.container, {resizeMode: 'stretch'}]} source={require('../../images/bg-user_type_selection.png')}/>
                <View style={[Styles.container, Styles.containerMask]}/>
                <View style={Styles.container}>
                    <View style={{flex: 2, justifyContent: 'center', alignSelf: 'center'}}>
                        <Image style={Styles.logo} source={require('../../images/logo-work_guru-user_type_selection.png')}/>
                    </View>
                    <View style={{flex: 3, alignItems: 'center'}}>
                        <Text style={Styles.selectYou}>
                            {Strings.SELECT_YOU}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <ImageButton
                                style={ Styles.selectBtn }
                                appearance={ {
                                    normal: require("../../images/Button/button-Hiring-normal.png"),
                                    highlight: require("../../images/Button/button-Hiring-pressed.png")
                                } }
                                onPress={() => this.onClick(1) }/>
                            <ImageButton
                                style={ Styles.selectBtn }
                                appearance={ {
                                    normal: require("../../images/Button/button-SeekingWork-normal.png"),
                                    highlight: require("../../images/Button/button-SeekingWork-pressed.png")
                                } }
                                onPress={() => this.onClick(0) }/>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <ImageButton
                                style={ Styles.selectBtn }
                                appearance={ {
                                    normal: require("../../images/Button/button-A_Business-normal.png"),
                                    highlight: require("../../images/Button/button-A_Business-pressed.png")
                                } }
                                onPress={() => this.onClick(2) }/>
                            <ImageButton
                                style={ Styles.selectBtn }
                                appearance={ {
                                    normal: require("../../images/Button/button-A_Recuriter-normal.png"),
                                    highlight: require("../../images/Button/button-A_Recuriter-pressed.png")
                                } }
                                onPress={() => this.onClick(3) }/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    onClick(userType) {
        this.props.navigation.dispatch({ type: Types.LOGIN, userType: userType })
    }
}

SelectScreen.navigationOptions = {
    header: null
};