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
var React     = require('react-native'),
    Loading   = require('./../components/Loading'),
    Helpers   = require('../utils/Helpers'),
    VenueView = require('./Venue'),
    TitleView = require('./Title'),
    Icon      = require('MaterialDesign'),
    RCTRefreshControl = require('RCTRefreshControl'),
    {Stylesheet, VenuesStyles, ListStyles, IndicatorStyles} = require('../utils/Styles'),
    LISTVIEW  = 'ListView',
    GPSOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 1000
    };

var {
    StyleSheet,
    View,
    Text,
    Component,
    ListView,
    TouchableHighlight,
    } = React;

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

/**
 * Venues View
 */
class VenuesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: baseDataSource
        };
    }

    componentDidMount() {
        // Turn Geo Callback into a promise
        var resolution,
            refPromise = fetch('https://lunchify.firebaseio.com/areas/keilaniemi/venues.json'),
            geoPromise = new Promise(function(resolve) {
                resolution = resolve;
            }),
            _this = this;

        // Wait for all promises to resolve
        Promise.all([refPromise, geoPromise]).then(([response, initialPosition]) => {
            response.json().then((response) => {
                // Calc Distances
                var venues = _this.calcDistances(response, initialPosition);

                // Set State
                _this.setState({
                    venues: venues,
                    dataSource: baseDataSource.cloneWithRows(venues),
                    initialPosition: initialPosition
                });
            });
        });

        // Call Geo location
        navigator.geolocation.getCurrentPosition(resolution);

        // ScrollView
        RCTRefreshControl.configure({
            node: this.refs[LISTVIEW]
        }, () => {
            this.recalcDistance();
        });
    }

    calcDistances(data, geo) {
        var venues = [];

        // Calc Distances
        for(var item in data) {
            var item = data[item];
            item.distance = Helpers.calcDistance({
                lat: geo.coords.latitude,
                lng: geo.coords.longitude
            }, {
                lat: item.lat,
                lng: item.lng
            });
            venues.push(item);
        };

        // Closest first
        venues.sort((a, b) => {
            return a.distance - b.distance;
        });

        return venues;
    }

    recalcDistance() {
        var _this = this;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setTimeout(() => {
                    _this.setState({
                        dataSource: baseDataSource.cloneWithRows(
                            _this.calcDistances(_this.state.venues, position)
                        ),
                        lastPosition: position
                    });
                    RCTRefreshControl.endRefreshing(_this.refs[LISTVIEW]);
                }, 500);
            }
        );
    }

    toVenue() {
        this.props.toRoute({
            name: 'Venue',
            component: VenueView,
            titleComponent: TitleView
        })
    }

    renderVenue(venue) {
        return (
            <VenuesItemView
                onPress={this.toVenue.bind(this)}
                venue={venue}
                />
        )
    }

    render() {
        return (
            <ListView
                ref={LISTVIEW}
                dataSource={this.state.dataSource}
                renderRow={this.renderVenue.bind(this)}
                />
        )
    }
}

/**
 * Item View
 */
class VenuesItemView extends Component{
    renderTitle(venue) {
        return (
            <Text style={ListStyles.infoTitle}>
                {venue.name}
            </Text>
        )
    }

    renderByline(venue) {
        return (
            <View style={[ListStyles.row, ListStyles.byline]}>
                <Badge>{Helpers.formatDistance(venue.distance)}</Badge>
                <View>
                    <Text style={[Stylesheet.text, ListStyles.infoAddress]} numberOfLines={1}>
                        {' '} {venue.address}
                    </Text>
                </View>
            </View>
        )
    }

    renderInfo() {
        var {venue} = this.props

        return (
            <View style={[Stylesheet.flex, Stylesheet.white]}>
                <View style={ListStyles.infoCell}>
                    {this.renderTitle(venue)}
                    {this.renderByline(venue)}
                </View>
            </View>
        )
    }

    renderArrow() {
        return (
            <View style={[Stylesheet.flex_20, Stylesheet.flexCenter, Stylesheet.white]}>
                <Icon name="keyboard-arrow-right" size={30} style={ListStyles.arrow}></Icon>
            </View>
        );
    }

    render() {
        return (
            <View style={Stylesheet.white}>
                <TouchableHighlight underlayColor="transparent" onPress={this.props.onPress}>
                    <View style={[ListStyles.row, ListStyles.itemRow]}>
                        {this.renderInfo()}
                        {this.renderArrow()}
                    </View>
                </TouchableHighlight>
                <View style={ListStyles.cellBorder} />
            </View>
        )
    }
}

/**
 * Badge
 */
class Badge extends Component {
    render() {
        return (
            <View style={ListStyles.badge}>
                <Icon name="location-on" size={10} style={ListStyles.badgeIcon} />
                <Text style={[Stylesheet.text, ListStyles.badgeText]} children={this.props.children} />
            </View>
        )
    }
}

/**
 * Styles
 */
module.exports = VenuesView;
