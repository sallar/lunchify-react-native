/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 31.05.2015
 */
'use strict';

var React  = require('react-native'),
    {Stylesheet} = require('../utils/Styles');

var {
    Component,
    View,
    MapView,
    StyleSheet,
    Text,
    TextInput,
} = React;

/**
 * Navigator Main Class
 */
//class MapView extends Component {
//    constructor(props) {
//        super(props);
//    }
//
//    render() {
//        return(
//            <View>
//                <MapView
//                    region={null}
//                    annotations={null}
//                    showsUserLocation={true}
//                    />
//            </View>
//        );
//    }
//}


class MapScreenView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            venue: props.data,
            isMounted: false
        }
    }

    componentDidMount() {
        this.setState({
            isMounted: false
        });
    }

    renderMap() {
        var Map;

        if(this.state.isMounted) {
            Map = (<MapView
                style={[styles.map]}
                annotations={[
                        {
                            latitude: parseFloat(this.state.venue.lat),
                            longitude: parseFloat(this.state.venue.lng),
                            title: this.state.venue.name,
                            subtitle: this.state.venue.address
                        }
                    ]}
                showsUserLocation={false}/>);
        } else {
            Map = <View />;
        }

        return Map;
    }

    render() {
        return (
            <View style={Stylesheet.flex}>
                <Text>Test</Text>
            </View>
        )
    }

}

var styles = StyleSheet.create({
    map: {
        width: 200,
        height: 200
    }
});

module.exports = MapScreenView;
