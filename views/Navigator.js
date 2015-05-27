/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

var React      = require('react-native'),
    Router     = require('react-native-router'),
    {Stylesheet, Variables} = require('../utils/Styles');

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
