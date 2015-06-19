/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 03.06.2015
 */
'use strict';

var React  = require('react-native'),
    {Stylesheet, NavigatorStyles} = require('../utils/Styles');

var {
    Component,
    Text,
    Image,
    } = React;

/**
 * Back Button
 */
module.exports = React.createClass({
    render() {
        return(
            <Text style={
                [Stylesheet.text,
                NavigatorStyles.navbarText,
                NavigatorStyles.backButtonText]
                }>Back</Text>
        );
    }
});
