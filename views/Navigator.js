/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

var React      = require('react-native'),
    Router     = require('react-native-router'),
    {Stylesheet, NavigatorStyle} = require('../utils/Styles');

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

    renderTitle(title: string) {
        return React.createClass({
            render: function() {
                return(
                    <Text style={[Stylesheet.text, NavigatorStyle.navbarText]}>{title}</Text>
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
                    titleComponent: this.renderTitle(this.props.title)
                }}
                headerStyle={NavigatorStyle.header}
                bgStyle={NavigatorStyle.scene}
                />
        );
    }
}

module.exports = Navigator;
