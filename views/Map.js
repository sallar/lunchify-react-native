/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 31.05.2015
 */
'use strict';

var React  = require('react-native'),
    Loading = require('./Loading'),
    {Stylesheet} = require('../utils/Styles');

var {
    Component,
    View,
    MapView,
    StyleSheet,
} = React;

class MapScreenView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            venue: props.data,
            isMounted: false,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isMounted: true
            });
        }, 500);

    }

    renderMap() {
        var Map;

        if(this.state.isMounted) {
            Map = (<MapView
                style={[styles.map]}
                region={{
                    latitude: parseFloat(this.state.venue.lat),
                    longitude: parseFloat(this.state.venue.lng),
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                showsUserLocation={true}
                annotations={[
                    {
                        latitude: parseFloat(this.state.venue.lat),
                        longitude: parseFloat(this.state.venue.lng),
                        title: this.state.venue.name,
                        subtitle: this.state.venue.address
                    }
                ]} />);
        } else {
            Map = <Loading />;
        }

        return Map;
    }

    render() {
        return (
            <View style={Stylesheet.textContainer}>
                {this.renderMap()}
            </View>
        )
    }

}

var styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

module.exports = MapScreenView;
