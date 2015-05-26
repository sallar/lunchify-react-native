'use strict';

var React      = require('react-native');
var Router     = require('react-native-router');
var Styles     = require('./app.styles');
var {Stylesheet, Variables} = require('./app.styles');

var {
    StyleSheet,
    Component,
    NavigatorIOS,
    Text,
    } = React;

/**
 * Navigator Main Class
 */
class Navigator extends Component {
    constructor(props) {
        super(props);
    }

    returnTitle(title: string) {
        return React.createClass({
            render: function() {
                return(
                    <Text style={[Stylesheet.text, Stylesheet.navbarText]}>{title}</Text>
                );
            }
        });
    }

    render() {
        return(
            <Router
                firstRoute={{
                    name: this.props.title,
                    component: this.props.component
                }}
                headerStyle={Stylesheet.headerStyle}
                />
        );
    }
}

/**
 * Styles
 */
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#1D4E89'
    }
});

module.exports = Navigator;
