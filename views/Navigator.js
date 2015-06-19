/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 19.06.2015
 */
'use strict';

var React = require('react-native');
var {
    PixelRatio,
    Navigator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image
} = React;

var MapView = require('./Map');
var {Variables, NavigatorStyles} = require('../utils/Styles');

var NavigationBarRouteMapper = {

    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }

        var previousRoute = navState.routeStack[index - 1];
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}>
                <View style={NavigatorStyles.navBarLeftButton}>
                    <Text style={[NavigatorStyles.navBarText, NavigatorStyles.navBarButtonText]}>
                        {'Back' || previousRoute.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },

    RightButton: function(route, navigator, index, navState) {
        if(typeof route.rightButton !== void 0) {
            return route.rightButton;
        }
        else {
            return (<View />);
        }
    },

    Title: function(route, navigator, index, navState) {
        if(typeof route.imageTitle !== "undefined") {
            return (
                <Image source={require('image!logo')} style={NavigatorStyles.navbarLogo} />
            );
        }
        return (
            <Text style={[NavigatorStyles.navBarText, NavigatorStyles.navBarTitleText]}>
                {route.title}
            </Text>
        );
    },

};

var NavigationBarView = React.createClass({

    renderScene: function(route, navigator) {
        var Component = route.component;
        return (
            <View style={NavigatorStyles.scene}>
                <Component nav={navigator} data={route.data || {}} />
            </View>
        )
    },

    render: function() {
        return (
            <Navigator
                debugOverlay={false}
                initialRoute={{
                    title: this.props.title,
                    imageTitle: true,
                    component: this.props.component
                }}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={NavigatorStyles.navBar}
                        />
                }
                />
        );
    },

});

module.exports = NavigationBarView;
