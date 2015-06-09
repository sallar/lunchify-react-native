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
        } = React;

var cssVar = require('cssVar');
var MapView = require('./Map');
var {Variables} = require('../utils/Styles');

var NavigationBarRouteMapper = {

    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }

        var previousRoute = navState.routeStack[index - 1];
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}>
                <View style={styles.navBarLeftButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        {'Back' || previousRoute.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },

    RightButton: function(route, navigator, index, navState) {
        if(typeof route.data === 'object' && route.title !== 'Directions') {
            return (
                <TouchableOpacity
                    onPress={() => navigator.push({
                        title: 'Directions',
                        component: MapView,
                        data: route.data.venue
                    })}>
                    <View style={styles.navBarRightButton}>
                        <Text style={[styles.navBarText, styles.navBarButtonText]}>
                            Map
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return (<View />);
        }
    },

    Title: function(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title} [{index}]
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
        var View = route.component;
        return (
            <View nav={navigator} data={route.data || {}} />
        )
    },

    render: function() {
        var Content = this.props.component;
        return (
            <Navigator
                debugOverlay={false}
                style={styles.appContainer}
                initialRoute={{
                    title: this.props.title,
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
    navBarText: {
        fontSize: 16,
        marginVertical: 10,
        fontFamily: Variables.fontFamily
    },
    navBarTitleText: {
        //color: cssVar('fbui-bluegray-60'),
        fontWeight: '500',
        marginVertical: 9,
        color: 'white'
    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        //color: cssVar('fbui-accent-blue'),
        color: 'white'
    },
    scene: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#EAEAEA',
    },
});

module.exports = NavigationBarSample;
