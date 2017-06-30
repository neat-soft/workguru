import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Styles from './styles'
import Strings from '../../string'
import ViewPager from '../../components/viewpager'
import ImageButton from '../../components/imagebutton/ImageButton';
import Types from '../../actions/actionTypes'

const guideImages = [
    {image: require("../../images/placeholder/profile.png")},
    {image: require("../../images/placeholder/profile.png")},
    {image: require("../../images/placeholder/profile.png")},
];

const CLICK_ID = {leftMenu: 1, button1: 3, button2: 4, button3: 5, button4: 6, button5: 7};

export default class UserProfileScreen extends React.Component {

    constructor(props) {
        super(props);

        const dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.state = {
            dataSource: dataSource.cloneWithPages(guideImages),
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerLeft: null,
            headerRight: null
        }
    };


    render() {
        return (
            <View style={Styles.container}>
                <ViewPager
                    style={{ flex: 5 }}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}>
                </ViewPager>

                <Text style={Styles.description}>
                    User Description Here
                </Text>

                {/* Button Group */}
                <View style={Styles.finding_buttonpanel}>
                    <View style={Styles.finding_buttongroup}>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-backtrack-normal.png"),
                                highlight: require("../../images/Button/button-backtrack-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button1) }/>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-x-normal.png"),
                                highlight: require("../../images/Button/button-x-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button2) }/>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-boost-normal.png"),
                                highlight: require("../../images/Button/button-boost-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button3) }/>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-heart-normal.png"),
                                highlight: require("../../images/Button/button-heart-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button4) }/>
                        <ImageButton
                            style={ Styles.selectBtn }
                            appearance={ {
                                normal: require("../../images/Button/button-star-normal.png"),
                                highlight: require("../../images/Button/button-star-pressed.png")
                            } }
                            onPress={() => this.onClick(CLICK_ID.button5) }/>
                    </View>
                </View>
                <ImageButton
                    style={{position: 'absolute', marginTop: 20, marginLeft: 10}}
                    appearance={ {
                        normal: require("../../images/Button/button-discovery-normal.png"),
                        highlight: require("../../images/Button/button-discovery-pressed.png")
                    } }
                    onPress={() => this.onClick(CLICK_ID.leftMenu) }/>
            </View>
        );
    }

    _renderPage(data: Object, pageID: number | string) {
        return (
            <Image
                source={data.image}
                style={Styles.slider}>
            </Image>
        );
    }

    onClick(actionType) {
        switch (actionType) {
            case CLICK_ID.button4:
            case CLICK_ID.button5:
            case CLICK_ID.button1:
            case CLICK_ID.button2:
            case CLICK_ID.button3:
                break;
            case CLICK_ID.leftMenu:
                this.props.navigation.dispatch({ type: Types.BACK });
                break;
        }
    }
}

UserProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

