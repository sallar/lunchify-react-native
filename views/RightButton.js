/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 19.06.2015
 */
'use strict';

var React = require('react-native'),
    Icon  = require('MaterialIcons'),
    {Stylesheet, NavigatorStyles} = require('../utils/Styles');

var {
    Component,
    View,
    TouchableOpacity
    } = React;

/**
 * Right Button
 */
var RightButton = React.createClass({
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}>
                <View style={NavigatorStyles.navBarRightButton}>
                    <Icon name={this.props.icon} size={24} style={[NavigatorStyles.navBarText, NavigatorStyles.navBarButtonText]} />
                </View>
            </TouchableOpacity>
        )
    }
});

module.exports = function(data) {
    return <RightButton icon={data.icon} onPress={() => data.navigator.push({
                title: data.title,
                component: data.component,
                data: data.data
            })} />;
};