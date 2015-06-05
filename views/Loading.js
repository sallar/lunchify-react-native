/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
var React = require('react-native');
var {Stylesheet, LoadingStyles} = require('../utils/Styles.js');
var {
    ActivityIndicatorIOS,
    StyleSheet,
    Text,
    View,
    } = React;


var Loading = React.createClass({
    render() {
        return (
            <View style={LoadingStyles.container}>
                <View style={[LoadingStyles.loading]}>
                    <ActivityIndicatorIOS style={{alignSelf: 'center'}} />
                    <Text style={Stylesheet.text}>Loading {this.props.children}</Text>
                </View>
            </View>
        )
    }
});

module.exports = Loading