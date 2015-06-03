/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';
//socket.io assumes navigator.userAgent is a string, supply a dummy one to make it happy
window.navigator.userAgent = "react-native";
/**
 * Required Modules
 */
var React        = require('react-native'),
    firebase     = require('./../firebase-debug'),
    Helpers      = require('../utils/Helpers'),
    Icon         = require('MaterialDesign'),
    ParallaxView = require('react-native-parallax-view'),
    {Stylesheet, VenueStyles} = require('../utils/Styles');

var {
    View,
    Text,
    Component,
    TouchableHighlight,
    } = React;

/**
 * Venues View
 */
class VenueView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var ref = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/venues");

        // Data
        ref.on("value",function(snapshot) {
            // Calc Distances
            // var venues = this.calcDistances(snapshot, initialPosition);
            console.log(snapshot);
            //
            //// Set State
            //this.setState({
            //    venues: snapshot,
            //    dataSource: baseDataSource.cloneWithRows(venues),
            //    initialPosition: initialPosition
            //});
        }.bind(this));
    }

    renderHeader() {
        return (
            <View style={VenueStyles.header}>
                <Text style={[Stylesheet.text, VenueStyles.headerText]}>
                    Sodexo Keilaranta 1
                </Text>
            </View>
        )
    }

    render() {
        return (
            <ParallaxView
                backgroundSource={{uri: 'http://192.168.11.2/ravintola-maukas.jpg'}}
                header={this.renderHeader()}
                windowHeight={150}
                blur={"dark"}
                >
                <View style={Stylesheet.textContainer}>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                    <Text>Damn</Text>
                </View>
            </ParallaxView>
        )
    }
}

/**
 * Export
 */
module.exports = VenueView;
