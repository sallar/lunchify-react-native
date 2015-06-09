/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
    Image,
        } = React;

var cssVar = require('cssVar');
var MapView = require('./Map');
var Icon      = require('MaterialIcons');
var {Variables, NavigatorStyle} = require('../utils/Styles');

var NavigationBarRouteMapper = {

    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }

        var previousRoute = navState.routeStack[index - 1];
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}>
                <View style={NavigatorStyle.navBarLeftButton}>
                    <Text style={[NavigatorStyle.navBarText, NavigatorStyle.navBarButtonText]}>
                        {'Back' || previousRoute.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },

    RightButton: function(route, navigator, index, navState) {
        if(typeof route.data === 'object' && route.title !== 'Map') {
            return (
                <TouchableOpacity
                    onPress={() => navigator.push({
                        title: 'Map',
                        component: MapView,
                        data: route.data.venue
                    })}>
                    <View style={NavigatorStyle.navBarRightButton}>
                        <Icon name="map" size={24} style={[NavigatorStyle.navBarText, NavigatorStyle.navBarButtonText]} />
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return (<View />);
        }
    },

    Title: function(route, navigator, index, navState) {
        if(typeof route.imageTitle !== "undefined") {
            return (
                <Image source={require('image!logo')} style={NavigatorStyle.navbarLogo} />
            );
        }
        return (
            <Text style={[NavigatorStyle.navBarText, NavigatorStyle.navBarTitleText]}>
                {route.title}
            </Text>
        );
    },

};

function newRandomRoute() {
    return {
        title: '#' + Math.ceil(Math.random() * 1000),
    };
}

var NavigationBarSample = React.createClass({

    renderScene: function(route, navigator) {
        var Component = route.component;
        return (
            <View style={NavigatorStyle.scene}>
                <Component nav={navigator} data={route.data || {}} />
            </View>
        )
    },

    render: function() {
        return (
            <Navigator
                debugOverlay={false}
                style={styles.appContainer}
                initialRoute={{
                    title: this.props.title,
                    imageTitle: true,
                    component: this.props.component
                }}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={styles.navBar}
                        />
                }
                />
        );
    },

});

var styles = StyleSheet.create({
    messageText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 15,
        marginTop: 50,
        marginLeft: 15,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#CDCDCD',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
    navBar: {
        backgroundColor: Variables.brandColor,
    },


    scene: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#EAEAEA',
    },
});

module.exports = NavigationBarSample;
