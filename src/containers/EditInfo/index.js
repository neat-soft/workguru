import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import Prompt from 'react-native-prompt'
import Styles from './styles'
import Strings from '../../string'
import ImageButton from '../../components/imagebutton/ImageButton';
import Types from '../../actions/actionTypes'
import SettingsList from '../../components/settings-list';
import global from '../../global'
import firebase from '../../firebase'

const db = firebase.database();
const CLICK_ID = {about: 1, contact: 2, company: 3, current_work: 4, skills: 5, education: 6, degree: 7, gender: 8};

export default class EditInfoScreen extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeEduValue = this.onChangeEduValue.bind(this);
        this.onChangeAgeValue = this.onChangeAgeValue.bind(this);

        this.state = {
            sliderSalaryValue: [global.profile.salary.from/*, global.profile.salary.to*/],
            sliderAgeValue: [global.user.age],
            switchEduValue: global.profile.show_edu,
            switchAgeValue: global.profile.show_age,
            genderValue: global.user.gender,
            promptID: 0,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({handleSave: this.addUserToDB});
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <ImageButton
                style={{margin: 10}}
                appearance={ {
                    normal: require("../../images/Button/button-Setting-disable.png"),
                    highlight: require("../../images/Button/button-Setting-disable.png")
                } }
                onPress={() => navigation.dispatch({ type: Types.BACK }) }/>,
            headerRight:
                <TouchableHighlight onPress={() => navigation.state.params.handleSave(navigation)}>
                    <Text style={{margin: 10, color: '#FCC529'}}>Done</Text>
                </TouchableHighlight>
        }
    };

    addUserToDB(navigation) {
        var ref = db.ref(`${global.url.USER}/${global.user.id}`);
        ref.update({
            email: global.user.email,
            phone_no: global.user.phone_no,
            age: global.user.age,
            gender: global.user.gender
        });
        ref = db.ref(`${global.url.PROFILE}/${global.user.id}`);
        ref.update({
            about: global.profile.about,
            company: global.profile.company,
            salary: {
                from: global.profile.salary.from,
                to: global.profile.salary.to
            },
            skills: global.profile.skills,
            current_work: global.profile.current_work,
            education: global.profile.education,
            degree: global.profile.degree,
        });
        navigation.dispatch({ type: Types.PROFILE_PREVIEW });
    }

    render() {
        let promptView;
        var title = "", placeholder = "", defaultValue = "";
        switch (this.state.promptID) {
            case CLICK_ID.about:
                title = Strings.EDIT_ABOUT;
                placeholder = "About You";
                defaultValue = global.profile.about;
                break;
            // case CLICK_ID.contact:
            //     title = Strings.EDIT_CONTACT_INFO;
            //     placeholder = "About You";
            //     defaultValue = global.profile.about;
            //     break;
            case CLICK_ID.company:
                title = Strings.EDIT_COMPANY;
                placeholder = "";
                defaultValue = global.profile.company;
                break;
            case CLICK_ID.current_work:
                title = Strings.EDIT_CURRENT_WORK;
                placeholder = "";
                defaultValue = global.profile.current_work;
                break;
            case CLICK_ID.skills:
                title = Strings.EDIT_SKILLS;
                placeholder = "";
                defaultValue = global.profile.skills;
                break;
            case CLICK_ID.education:
                title = Strings.EDIT_EDUCATION;
                placeholder = "";
                defaultValue = global.profile.education;
                break;
            case CLICK_ID.degree:
                title = Strings.EDIT_DEGREE;
                placeholder = "";
                defaultValue = global.profile.degree;
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
                    <View style={Styles.containerPhoto}>
                        <Image style={Styles.photo} source={require("../../images/placeholder/profile.png")}/>
                        <View style={Styles.photoCandidatesGroup}>
                            <Image style={Styles.photoCandidates} source={require("../../images/placeholder/profile.png")}/>
                            <Image style={Styles.photoCandidates} source={require("../../images/placeholder/profile.png")}/>
                            <Image style={Styles.photoCandidates} source={require("../../images/placeholder/profile.png")}/>
                        </View>
                    </View>
                    <SettingsList borderColor='#C8C7CC' defaultItemSize={60}>
                        <SettingsList.Header headerStyle={{marginTop:5}}/>
                        {
                            global.user.level &&
                            <SettingsList.Item
                                title={Strings.EDIT_ABOUT}
                                titleInfo={global.profile.about}
                                titleInfoPosition={'Bottom'}
                                onPress={() => this.setState({promptID: CLICK_ID.about})}
                                titleInfoStyle={Styles.titleInfoStyle}>
                            </SettingsList.Item>
                        }
                        {
                            global.user.level &&
                            <SettingsList.Item
                                title={Strings.EDIT_CONTACT_INFO}
                                titleInfo={global.user.email + '\n' + global.user.phone_no}
                                titleInfoPosition={'Bottom'}
                                titleInfoStyle={Styles.titleInfoStyle}>
                            </SettingsList.Item>
                        }
                        {
                            global.user.level &&
                            <SettingsList.Item
                                title={Strings.EDIT_COMPANY}
                                titleInfo={global.profile.company}
                                titleInfoPosition={'Bottom'}
                                onPress={() => this.setState({promptID: CLICK_ID.company})}
                                titleInfoStyle={Styles.titleInfoStyle}>
                            </SettingsList.Item>
                        }
                        {
                            <SettingsList.Item
                                title={Strings.EDIT_CURRENT_WORK}
                                titleInfo={global.profile.current_work}
                                titleInfoPosition={'Bottom'}
                                onPress={() => this.setState({promptID: CLICK_ID.current_work})}
                                titleInfoStyle={Styles.titleInfoStyle}>
                            </SettingsList.Item>
                        }
                        {
                            global.user.level && global.user.type === 0 &&
                            <SettingsList.Item
                                title={Strings.EDIT_CURRENT_SALARY}
                                titleInfo={this.state.sliderSalaryValue[0].toLocaleString('en') + " " + Strings.SETTING_SALARY_UNIT}
                                titleInfoStyle={Styles.titleInfoStyle}
                                hasNavArrow={false}
                                hasSlider={true}
                                onValuesChange={(values) => {
                                    this.setState({sliderSalaryValue: values})
                                }}
                                onValuesChangeFinish={() => {
                                    global.profile.salary.from = this.state.sliderSalaryValue[0];
                                    global.profile.salary.to = this.state.sliderSalaryValue[1];
                                }}
                                sliderMinValue={10000}
                                sliderMaxValue={100000}
                                sliderLength={350}
                                sliderValues={this.state.sliderSalaryValue}>
                            </SettingsList.Item>
                        }
                        {
                            global.user.level &&
                            <SettingsList.Item
                                title={Strings.EDIT_SKILLS}
                                titleInfo={global.profile.skills}
                                titleInfoPosition={'Bottom'}
                                onPress={() => this.setState({promptID: CLICK_ID.skills})}
                                titleInfoStyle={Styles.titleInfoStyle}>
                            </SettingsList.Item>
                        }
                        {
                            global.user.level &&
                            <SettingsList.Item
                                title={Strings.EDIT_EDUCATION}
                                titleInfo={global.profile.education}
                                titleInfoPosition={'Bottom'}
                                onPress={() => this.setState({promptID: CLICK_ID.education})}
                                titleInfoStyle={Styles.titleInfoStyle}>
                            </SettingsList.Item>
                        }
                        {
                            <SettingsList.Item
                                title={Strings.EDIT_DEGREE}
                                titleInfo={global.profile.degree}
                                titleInfoPosition={'Bottom'}
                                onPress={() => this.setState({promptID: CLICK_ID.degree})}
                                titleInfoStyle={Styles.titleInfoStyle}>
                            </SettingsList.Item>
                        }
                        {
                            <SettingsList.Item
                                title={Strings.EDIT_GENDER}
                                titleInfo={global.user.gender ? 'Female' : 'Male'}
                                titleInfoStyle={Styles.titleInfoStyle}
                                onPress={ () => this.onChangeGenderValue() }>
                            </SettingsList.Item>
                        }
                        {
                            global.user.level &&
                            <SettingsList.Item
                                title={Strings.EDIT_AGE}
                                titleInfo={this.state.sliderAgeValue[0] + " " + Strings.SETTING_YEARS}
                                titleInfoStyle={Styles.titleInfoStyle}
                                hasNavArrow={false}
                                hasSlider={true}
                                onValuesChange={(values) => {
                                    this.setState({sliderAgeValue: values})
                                }}
                                onValuesChangeFinish={() => {
                                    global.user.age = this.state.sliderAgeValue[0]
                                }}
                                sliderMinValue={10}
                                sliderMaxValue={60}
                                sliderLength={350}
                                sliderValues={this.state.sliderAgeValue}>
                            </SettingsList.Item>
                        }

                        <SettingsList.Header headerStyle={{marginTop:5}}/>
                        <SettingsList.Item
                            title={Strings.EDIT_SHOW_EDUCATION}
                            hasSwitch={true}
                            switchOnColor='#FCC529'
                            switchState={this.state.switchEduValue}
                            switchOnValueChange={this.onChangeEduValue}
                            hasNavArrow={false}>
                        </SettingsList.Item>
                        <SettingsList.Item
                            title={Strings.EDIT_SHOW_AGE}
                            hasSwitch={true}
                            switchOnColor='#FCC529'
                            switchState={this.state.switchAgeValue}
                            switchOnValueChange={this.onChangeAgeValue}
                            hasNavArrow={false}>
                        </SettingsList.Item>
                    </SettingsList>
                </View>
                {this.state.promptID > 0 ? promptView : null}
            </ScrollView>

        );
    }

    onChangeEduValue(value) {
        this.setState({switchEduValue: value});
        global.profile.show_edu = value;
    }

    onChangeAgeValue(value) {
        this.setState({switchAgeValue: value});
        global.profile.show_age = value;
    }

    onChangeGenderValue() {
        let value = global.user.gender;
        this.setState({genderValue: !value});
        global.user.gender = !value;
    }

    onClick(clickID, value) {
        switch (clickID) {
            case CLICK_ID.about:
                global.profile.about = value;
                break;
            case CLICK_ID.company:
                global.profile.company = value;
                break;
            case CLICK_ID.current_work:
                global.profile.current_work = value;
                break;
            case CLICK_ID.skills:
                global.profile.skills = value;
                break;
            case CLICK_ID.education:
                global.profile.education = value;
                break;
            case CLICK_ID.degree:
                global.profile.degree = value;
                break;
        }
    }
}

EditInfoScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

