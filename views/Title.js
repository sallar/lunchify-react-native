/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 31.05.2015
 */
'use strict';

var React  = require('react-native'),
    {Stylesheet, NavigatorStyle} = require('../utils/Styles');

var {
    Component,
    Text,
    Image,
    } = React;

/**
 * Title
 */
module.exports = React.createClass({
    render() {
        if( this.props.text == 'Venues' ) {
            return(
                <Image source={require('image!logo')} style={NavigatorStyle.navbarLogo} />
            );
        }
        return(
            <Text style={[Stylesheet.text, NavigatorStyle.navbarText]}>{this.props.text}</Text>
        );
    }
});
