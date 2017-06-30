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

export default class ProfilePreviewScreen extends React.Component {

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
            headerLeft:
                <TouchableHighlight onPress={() => navigation.dispatch({type: Types.BACK})}>
                    <Text style={{margin: 10/*, color: '#FCC529'*/}}>Back</Text>
                </TouchableHighlight>,
            headerRight: <ImageButton
                style={{margin: 10}}
                appearance={ {
                    normal: require("../../images/Button/button-Setting-disable.png"),
                    highlight: require("../../images/Button/button-Setting-disable.png")
                } }
                onPress={() => navigation.dispatch({type: Types.SETTING}) }/>
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
}

ProfilePreviewScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

