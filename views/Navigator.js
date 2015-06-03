/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

var React  = require('react-native'),
    Router = require('react-native-router'),
    Icon   = require('MaterialDesign'),
    Title  = require('./Title'),
    AboutView = require('./About'),
    BackButtonView = require('./BackButton'),
    {Stylesheet, NavigatorStyle} = require('../utils/Styles');

var {
    StyleSheet,
    Component,
    NavigatorIOS,
    Text,
    TouchableHighlight,
    View,
    } = React;

/**
 * Navigator Main Class
 */
class Navigator extends Component {
    constructor(props) {
        super(props);
    }

    renderTitle(title: string) {
        return React.createClass({
            render: function() {
                return(
                    <Text style={[Stylesheet.text, NavigatorStyle.navbarText]}>{title}</Text>
                );
            }
        });
    }

    renderAboutButton() {
        return React.createClass({
            aboutScreen() {
                this.props.toRoute({
                    name: 'About Lunchify',
                    component: AboutView,
                    titleComponent: Title
                })
            },

            render: function() {
                return(
                    <TouchableHighlight underlayColor="transparent" onPress={this.aboutScreen}>
                        <View>
                            <Icon name="info-outline" size={24} style={NavigatorStyle.icon} />
                        </View>
                    </TouchableHighlight>
                );
            }
        });
    }

    render() {
        return(
            <Router
                firstRoute={{
                    name: this.props.title,
                    component: this.props.component,
                    titleComponent: Title,
                    leftCorner: this.renderAboutButton()
                }}
                headerStyle={NavigatorStyle.header}
                bgStyle={NavigatorStyle.scene}
                backButtonComponent={BackButtonView}
                />
        );
    }
}

module.exports = Navigator;
