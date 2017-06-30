import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View, Image, Alert, Slider, ScrollView } from 'react-native';
import Styles from './styles'
import Strings from '../../string'
import ImageButton from '../../components/imagebutton/ImageButton';
import Types from '../../actions/actionTypes'
import SettingsList from '../../components/settings-list';
import global from '../../global'
import storage from '../../storage'
import Prompt from 'react-native-prompt'

const CLICK_ID = {type_work: 1, field_work: 2, job_title: 3, experience: 4, skills: 5, gender: 6, nationality: 7, location: 8, language: 9};

export default class SettingScreen extends React.Component {

    constructor(){
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
            sliderSalaryValue: [global.filter.salary.from, global.filter.salary.to],
            sliderYearValue: [global.filter.years_of_exp],
            sliderAgeValue: [global.filter.age],
            genderValue: global.filter.gender,
            sliderDistValue: [global.filter.distance],
            sliderFontSizeValue: [global.filter.fontSize],
            switchValue: false,
            promptID: 0,
        };
    }

    render() {
        let promptView;
        var title = "", placeholder = "", defaultValue = "";
        switch (this.state.promptID) {
            case CLICK_ID.type_work:
                title = Strings.SETTING_TYPE;
                placeholder = "";
                defaultValue = global.filter.type_of_work;
                break;
            case CLICK_ID.field_work:
                title = global.user.type === 1 ? Strings.SETTING_FIELD : Strings.SETTING_FIELD_WORK;
                placeholder = "";
                defaultValue = global.filter.field_of_work;
                break;
            case CLICK_ID.job_title:
                title = global.user.type === 0 ? Strings.SETTING_DESIRED_JOB : Strings.SETTING_JOB;
                placeholder = "";
                defaultValue = global.filter.job_title;
                break;
            case CLICK_ID.skills:
                title = global.user.type === 0 ? Strings.SETTING_LEADER_SKILLS : Strings.SETTING_CANDIDATE_SKILLS;
                placeholder = "";
                defaultValue = global.filter.skills;
                break;
            case CLICK_ID.nationality:
                title = global.user.type === 0 ? Strings.SETTING_LEADER_NATIONALITY : Strings.SETTING_CANDIDATE_NATIONALITY;
                placeholder = "";
                defaultValue = global.filter.nationality;
                break;
            case CLICK_ID.location:
                title = Strings.SETTING_LOCATION;
                placeholder = "";
                defaultValue = global.filter.location;
                break;
        }
        promptView =
            <Prompt
                title={ title }
                placeholder={ placeholder }
                defaultValue={ defaultValue }
                visible={ this.state.promptID !== 0 }
                onCancel={ () => this.setState({
                    promptID: 0,
                }) }
                onSubmit={ (value) => {
                    this.onClick(this.state.promptID, value);
                    this.setState({
                        promptID: 0,
                    });
                } }/>;

        return (
            <ScrollView>
                <View style={Styles.container}>
                    <View style={{flex: 0.1}}>
                        <View style={Styles.photo}>
                            <Image style={{resizeMode: 'center'}} source={require('../../images/placeholder/profile image.png')} />
                            <ImageButton
                                style={{margin: 10}}
                                appearance={ {
                                    normal: require("../../images/Button/Button-Edit.png"),
                                    highlight: require("../../images/Button/Button-Edit.png")
                                } }
                                onPress={() => this.props.navigation.dispatch({ type: Types.EDIT_INFO }) }/>
                        </View>
                        <View style={Styles.info}>
                            <Text style={Styles.info_name}>
                                {global.user.name}
                            </Text>
                            <Text style={Styles.info_description}>
                                {global.profile.current_work} at {global.profile.company}
                            </Text>
                        </View>
                    </View>
                    <SettingsList borderColor='#C8C7CC' defaultItemSize={60}>
                        {/*Search settings - Work*/}
                        <SettingsList.Header
                            headerText={Strings.SETTING_SEARCH + " - " +
                            (global.user.type === 1 ? Strings.SETTING_HEADER_OFFER : Strings.SETTING_HEADER_WORK)}
                            headerStyle={{marginTop: 20, padding: 10}}/>
                        <SettingsList.Item
                            title={Strings.SETTING_TYPE}
                            titleInfo={global.filter.type_of_work}
                            titleInfoPosition={'Bottom'}
                            titleInfoStyle={Styles.titleInfoStyle}
                            onPress={() => this.setState({promptID: CLICK_ID.type_work})}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={global.user.type === 1 ? Strings.SETTING_FIELD : Strings.SETTING_FIELD_WORK}
                            titleInfo={global.filter.field_of_work}
                            titleInfoPosition={'Bottom'}
                            titleInfoStyle={Styles.titleInfoStyle}
                            onPress={() => this.setState({promptID: CLICK_ID.field_work})}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={global.user.type === 0 ? Strings.SETTING_DESIRED_JOB : Strings.SETTING_JOB}
                            titleInfo={global.filter.job_title}
                            titleInfoPosition={'Bottom'}
                            titleInfoStyle={Styles.titleInfoStyle}
                            onPress={() => this.setState({promptID: CLICK_ID.job_title})}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={global.user.type === 0 ? Strings.SETTING_EXPECTED_SALARY : Strings.SETTING_MONTHLY_SALARY}
                            titleInfo={this.state.sliderSalaryValue[0].toLocaleString('en') + "-" + this.state.sliderSalaryValue[1].toLocaleString('en') + " " + Strings.SETTING_SALARY_UNIT}
                            titleInfoStyle={Styles.titleInfoStyle}
                            hasNavArrow={false}
                            hasSlider={true}
                            onValuesChange={(values) => {
                                this.setState({sliderSalaryValue: values})
                            }}
                            onValuesChangeFinish={() => this.onSliderSalaryChange()}
                            sliderMinValue={10000}
                            sliderMaxValue={100000}
                            sliderLength={350}
                            sliderValues={this.state.sliderSalaryValue}>
                        </SettingsList.Item>
                        {/*Search settings - Leader/Candidate*/}
                        <SettingsList.Header
                            headerText={Strings.SETTING_SEARCH + " - " +
                            (global.user.type === 0 ? Strings.SETTING_HEADER_LEADER : Strings.SETTING_HEADER_CANDIDATE)}
                            headerStyle={{padding: 10}}/>
                        <SettingsList.Item
                            title={global.user.type === 0 ? Strings.SETTING_LEADER_EXPERIENCE : Strings.SETTING_CANDIDATE_EXPERIENCE}
                            titleInfo={this.state.sliderYearValue[0] + " " + Strings.SETTING_YEARS}
                            titleInfoStyle={Styles.titleInfoStyle}
                            hasNavArrow={false}
                            hasSlider={true}
                            onValuesChange={(values) => {
                                this.setState({sliderYearValue: values})
                            }}
                            onValuesChangeFinish={() => this.onSliderYearChange()}
                            sliderMinValue={10}
                            sliderMaxValue={60}
                            sliderLength={350}
                            sliderValues={this.state.sliderYearValue}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={global.user.type === 0 ? Strings.SETTING_LEADER_SKILLS : Strings.SETTING_CANDIDATE_SKILLS}
                            titleInfo={global.filter.skills}
                            titleInfoPosition={'Bottom'}
                            titleInfoStyle={Styles.titleInfoStyle}
                            onPress={() => this.setState({promptID: CLICK_ID.skills})}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={global.user.type === 0 ? Strings.SETTING_LEADER_AGE : Strings.SETTING_CANDIDATE_AGE}
                            titleInfo={this.state.sliderAgeValue[0] + " " + Strings.SETTING_YEARS}
                            titleInfoStyle={Styles.titleInfoStyle}
                            hasNavArrow={false}
                            hasSlider={true}
                            onValuesChange={(values) => {
                                this.setState({sliderAgeValue: values})
                            }}
                            onValuesChangeFinish={() => this.onSliderAgeChange()}
                            sliderMinValue={10}
                            sliderMaxValue={60}
                            sliderLength={350}
                            sliderValues={this.state.sliderAgeValue}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={global.user.type === 0 ? Strings.SETTING_LEADER_GENDER : Strings.SETTING_CANDIDATE_GENDER}
                            titleInfo={global.filter.gender}
                            titleInfoPosition={'Bottom'}
                            titleInfoStyle={Styles.titleInfoStyle}
                            onPress={() => Alert.alert('Route to Nationality Page')}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={global.user.type === 0 ? Strings.SETTING_LEADER_NATIONALITY : Strings.SETTING_CANDIDATE_NATIONALITY}
                            titleInfo={global.filter.nationality}
                            titleInfoPosition={'Bottom'}
                            titleInfoStyle={Styles.titleInfoStyle}
                            onPress={() => this.setState({promptID: CLICK_ID.nationality})}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={Strings.SETTING_DISTANCE}
                            titleInfo={this.state.sliderDistValue[0] + " km"}
                            titleInfoStyle={Styles.titleInfoStyle}
                            hasNavArrow={false}
                            hasSlider={true}
                            onValuesChange={(values) => {
                                this.setState({sliderDistValue: values})
                            }}
                            onValuesChangeFinish={() => this.onSliderDistChange()}
                            sliderMinValue={0}
                            sliderMaxValue={100}
                            sliderLength={350}
                            sliderValues={this.state.sliderDistValue}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={Strings.SETTING_LOCATION}
                            titleInfo={global.filter.location}
                            titleInfoPosition={'Bottom'}
                            titleInfoStyle={Styles.titleInfoStyle}
                            onPress={() => this.setState({promptID: CLICK_ID.location})}>
                        </SettingsList.Item>
                        {/*App settings*/}
                        <SettingsList.Header
                            headerText={Strings.SETTING_HEADER_APP}
                            headerStyle={{padding: 10}}/>
                        <SettingsList.Item
                            title={Strings.SETTING_FONT}
                            titleInfo={"AA"}
                            titleInfoStyle={Styles.titleInfoStyle}
                            hasNavArrow={false}
                            hasSlider={true}
                            sliderValues={[7]}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={Strings.SETTING_LANGUAGE}
                            titleInfo={"American English"}
                            titleInfoStyle={Styles.titleInfoStyle}
                            hasNavArrow={false}
                            onPress={() => Alert.alert('Route to Language Page')}>
                        </SettingsList.Item>
                        <SettingsList.Header headerStyle={{marginTop:5}}/>
                    </SettingsList>
                </View>
                {this.state.promptID > 0 ? promptView : null}
            </ScrollView>
        );
    }

    onSliderSalaryChange() {
        global.filter.salary.from = this.state.sliderSalaryValue[0];
        global.filter.salary.to = this.state.sliderSalaryValue[1];
        storage.save({key: 'filter', data: global.filter});
    }

    onSliderYearChange() {
        global.filter.years_of_exp = this.state.sliderYearValue[0];
        storage.save({key: 'filter', data: global.filter});
    }

    onSliderAgeChange() {
        global.filter.age = this.state.sliderAgeValue[0];
        storage.save({key: 'filter', data: global.filter});
    }

    onSliderDistChange() {
        global.filter.distance = this.state.sliderDistValue[0];
        storage.save({key: 'filter', data: global.filter});
    }

    onValueChange(value) {
        this.setState({switchValue: value});
    }

    onClick(clickID, value) {
        switch (clickID) {
            case CLICK_ID.type_work:
                global.filter.type_of_work = value;
                break;
            case CLICK_ID.field_work:
                global.filter.field_of_work = value;
                break;
            case CLICK_ID.job_title:
                global.filter.job_title = value;
                break;
            case CLICK_ID.skills:
                global.filter.skills = value;
                break;
            case CLICK_ID.nationality:
                global.filter.nationality = value;
                break;
            case CLICK_ID.location:
                global.filter.location = value;
                break;
        }
        storage.save({key: 'filter', data: global.filter});
    }
}

SettingScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

SettingScreen.navigationOptions = ({ navigation }) => {
    return {
        title: <Image
            style={{margin: 5}}
            source={require('../../images/Button/button_setting_normal.png')}/>,
        headerLeft: null,
        headerRight: <ImageButton
            style={{margin: 10}}
            appearance={ {
                normal: require("../../images/Button/button-discovery-normal.png"),
                highlight: require("../../images/Button/button-discovery-pressed.png")
            } }
            onPress={() => navigation.dispatch({ type: Types.HOME }) }/>,
    }
};
