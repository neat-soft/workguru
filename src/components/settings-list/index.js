'use strict'

import React from 'react';

import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Switch,
    Image,
    Slider
} from 'react-native';
import MultiSlider from 'react-native-multi-slider';

const ARROW_ICON = require('./img/icon-arrow-settings.png');

class SettingsList extends React.Component {
    static propTypes = {
        backgroundColor: React.PropTypes.string,
        borderColor: React.PropTypes.string,
        defaultItemSize: React.PropTypes.number,
        underlayColor: React.PropTypes.string,
        defaultTitleStyle: Text.propTypes.style,
        defaultTitleInfoPosition: React.PropTypes.string,
    };

    static defaultProps ={
        backgroundColor: 'white',
        borderColor: 'black',
        defaultItemSize: 50,
        underlayColor: 'transparent',
        defaultTitleStyle: {fontSize: 16}
    };

    _getGroups(){
        var groupNumber = -1;
        let headers = [];
        let itemGroup = [];
        let result = [];
        let other = [];
        React.Children.forEach(this.props.children, (child) => {
            // Allow for null, optional fields
            if(!child) return;

            if(child.type.displayName === 'Header'){
                if(groupNumber != -1){
                    result[groupNumber] = {items: itemGroup, header: headers[groupNumber], other: other};
                    itemGroup = [];
                    other = [];
                }
                groupNumber++;
                headers[groupNumber] = child.props;
            } else if(child.type.displayName === 'Item'){
                if(groupNumber == -1){
                    groupNumber++;
                }
                itemGroup.push(child.props);
            } else {
                if(groupNumber == -1){
                    groupNumber++;
                }
                other.push(child);
            }
        });
        result[groupNumber] = {items: itemGroup, header: headers[groupNumber], other: other};
        return result;
    }

    render(){
        return (
            <ScrollView>
                {this._getGroups().map((group, index) => {
                    return this._groupView(group, index);
                })}
            </ScrollView>
        )
    }

    _groupView(group, index){
        if(group.header){
            return (
                <View key={'group_' + index}>
                    {group.other}
                  <Text style={[{margin:5},group.header.headerStyle]}>{group.header.headerText}</Text>
                  <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor: this.props.borderColor}}>
                      {group.items.map((item, index) => {
                          return this._itemView(item,index, group.items.length);
                      })}
                  </View>
                </View>
            )
        } else {
            return (
                <View key={'group_' + index}>
                    {group.other}
                  <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor: this.props.borderColor}}>
                      {group.items.map((item, index) => {
                          return this._itemView(item,index, group.items.length);
                      })}
                  </View>
                </View>
            )
        }
    }

    _itemTitleBlock(item, index, position) {
        return ([
          <Text
              key={'itemTitle_' + index}
              style={[
                  item.titleStyle ? item.titleStyle : this.props.defaultTitleStyle,
                  position === 'Bottom' ? null : styles.titleText
              ]}>
              {item.title}
          </Text>,
            item.titleInfo ?
                <Text
                    key={'itemTitleInfo_' + index}
                    style={[
                        position === 'Bottom' ? null : styles.rightSideStyle,
                        {color: '#B1B1B1'},
                        item.titleInfoStyle
                    ]}>
                    {item.titleInfo}
                </Text>
                : null
        ])
    }

    _itemView(item, index, max){
        var border;
        if(item.borderHide) {
            switch(item.borderHide) {
                case 'Top' : border = {borderBottomWidth:1, borderColor: this.props.borderColor}; break;
                case 'Bottom' : border = {borderTopWidth:1, borderColor: this.props.borderColor}; break;
            }
        } else {
            border = index === max-1 ? {borderWidth:0} : {borderBottomWidth:1, borderColor: this.props.borderColor};
        }

        let titleInfoPosition = item.titleInfoPosition ? item.titleInfoPosition : this.props.defaultTitleInfoPosition;

        return (
            <TouchableHighlight accessible={false} key={'item_' + index} underlayColor={item.underlayColor ? item.underlayColor : this.props.underlayColor} onPress={item.onPress} onLongPress={item.onLongPress}>
              <View style={[styles.itemBox, {height:(item.itemWidth ? item.itemWidth : this.props.defaultItemSize) + (item.hasSlider ? 10 : 0)}, border, {backgroundColor: item.backgroundColor ? item.backgroundColor : this.props.backgroundColor}]}>
                <View style={{flex: 1}}>
                    {item.icon}
                    {item.isAuth ?
                        <View style={[styles.titleBox]}>
                          <View style={{paddingLeft:5,flexDirection:'column',flex:1}}>
                            <View style={{borderBottomWidth:1,borderColor:this.props.borderColor}}>
                              <TextInput
                                  ref="UserNameInputBlock"
                                  onSubmitEditing={() => this.refs.PasswordInputBlock.focus()}
                                  style={{flex:1,height:30, borderBottomWidth:1}}
                                  placeholder = "username"
                                  {...item.authPropsUser}
                              />
                            </View>
                            <View>
                              <TextInput
                                  ref="PasswordInputBlock"
                                  style={{flex:1,height:30}}
                                  placeholder = "password"
                                  secureTextEntry={true}
                                  returnKeyType={'go'}
                                  {...item.authPropsPW}
                                  onSubmitEditing={() => item.onPress()}
                              />
                            </View>
                          </View>
                        </View>
                        :
                        <View style={[styles.titleBox, {height:item.itemWidth ? item.itemWidth : this.props.defaultItemSize}]}>
                            {titleInfoPosition === 'Bottom' ?
                                <View style={{flexDirection:'column',flex:1,justifyContent:'center'}}>
                                    {this._itemTitleBlock(item, index, 'Bottom')}
                                </View>
                                : this._itemTitleBlock(item, index)}

                            {item.rightSideContent ? item.rightSideContent : null}
                            {item.hasSwitch ?
                                <Switch
                                    {...item.switchProps}
                                    style={styles.rightSideStyle}
                                    onTintColor={item.switchOnColor}
                                    onValueChange={(value) => item.switchOnValueChange(value)}
                                    value={item.switchState}/>
                                : null}
                            {item.hasNavArrow ? item.arrowIcon ?
                                item.arrowIcon
                                :
                                <Image style={[styles.rightSideStyle, item.arrowStyle]} source={ARROW_ICON} /> : null
                            }
                        </View>
                    }
                </View>
                  {item.hasSlider ?
                      <MultiSlider
                          markerStyle={{height: 26, width: 26, borderRadius: 13, borderWidth: 0.5, borderColor: 'grey', backgroundColor:'#F8F8F8'}}
                          trackStyle={{height:2}}
                          selectedStyle={{backgroundColor: '#FCC838'}}
                          unselectedStyle={{backgroundColor: '#42E3C5'}}
                          values={item.sliderValues}
                          onValuesChangeStart={item.onValuesChangeStart}
                          onValuesChange={item.onValuesChange}
                          onValuesChangeFinish={item.onValuesChangeFinish}
                          min={item.sliderMinValue}
                          max={item.sliderMaxValue}
                          step={item.sliderStepValue}
                          sliderLength={item.sliderLength}/>
                  : null}
              </View>
            </TouchableHighlight>
        )
    }
}
module.exports = SettingsList;

const styles = StyleSheet.create({
    itemBox: {
        flex:1,
        justifyContent:'center',
        flexDirection:'column',
        paddingLeft: 15,
        paddingRight: 15,
    },
    titleBox: {
        flex:1,
        flexDirection:'row'
    },
    titleText: {
        flex:1,
        alignSelf:'center'
    },
    rightSideStyle: {
        alignSelf:'center',
        marginLeft: 5
    },
});

/**
 * Optional Header for groups
 */
SettingsList.Header = React.createClass({
    propTypes: {
        headerText: React.PropTypes.string,
        headerStyle: Text.propTypes.style,
    },
    /**
     * not directly rendered
     */
    render(){
        return null;
    }
});

/**
 * Individual Items in the Settings List
 */
SettingsList.Item = React.createClass({
    propTypes: {
        /**
         * Title being displayed
         */
        title: React.PropTypes.string,
        titleStyle: Text.propTypes.style,
        /**
         * Icon displayed on the left of the settings item
         */
        icon: React.PropTypes.node,
        /**
         * Individual item width.  Can be globally set in the parent.
         */
        itemWidth: React.PropTypes.number,
        /**
         * Allows for the item to become an auth item
         */
        isAuth: React.PropTypes.bool,
        authPropsUser: React.PropTypes.object,
        authPropsPW: React.PropTypes.object,
        /**
         * Individual background color. Can be globally set in the parent.
         */
        backgroundColor: React.PropTypes.string,

        /**
         * Individual underlay click color.  Can be globally set in the parent.
         */
        underlayColor: React.PropTypes.string,
        /**
         * Item on press callback.
         */
        onPress: React.PropTypes.func,
        /**
         * Item on long press callback.
         */
        onLongPress: React.PropTypes.func,
        /**
         * Enable or disable the > arrow at the end of the setting item.
         */
        hasNavArrow: React.PropTypes.bool,
        arrowIcon: React.PropTypes.node,

        arrowStyle: Image.propTypes.style,

        /**
         * Enable or disable a Switch component
         */
        hasSlider: React.PropTypes.bool,
        /**
         * Slider value
         */
        sliderValues: React.PropTypes.arrayOf(React.PropTypes.number),
        sliderMinValue: React.PropTypes.number,
        sliderMaxValue: React.PropTypes.number,
        sliderStepValue: React.PropTypes.number,
        /**
         * Slider callbacks
         */
        onValuesChangeStart: React.PropTypes.func,
        onValuesChange: React.PropTypes.func,
        onValuesChangeFinish: React.PropTypes.func,
        /**
         * Slider Length
         */
        sliderLength: React.PropTypes.number,

        /**
         * Enable or disable a Switch component
         */
        hasSwitch: React.PropTypes.bool,
        /**
         * Switch On Color
         */
        switchOnColor: React.PropTypes.string,
        /**
         * Switch state
         */
        switchState: React.PropTypes.bool,
        /**
         * Switch props
         */
        switchProps: React.PropTypes.object,
        /**
         * On value change callback
         */
        switchOnValueChange: React.PropTypes.func,
        /**
         * Right side information on the setting item
         */

        titleInfo: React.PropTypes.string,
        titleInfoStyle: Text.propTypes.style,
        /**
         * If 'Bottom', info is placed beneath the title
         */
        titleInfoPosition: React.PropTypes.string,
        /**
         * Right side content
         */
        rightSideContent: React.PropTypes.node,
      /* Gives opens to hide specific borders */
        borderHide: React.PropTypes.oneOf(['Top', 'Bottom', 'Both'])
    },
    getDefaultProps(){
        return {
            hasNavArrow: true
        }
    },
    /**
     * not directly rendered
     */
    render(){
        return null;
    },
});
