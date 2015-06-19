/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

/**
 * Required Modules
 */
var React             = require('react-native'),
    moment            = require('moment'),
    Loading           = require('./Loading'),
    Helpers           = require('../utils/Helpers'),
    Data              = require('../utils/Data'),
    VenuesItemView    = require('./VenuesItem'),
    VenueView         = require('./Venue'),
    MapView           = require('./Map'),
    RightButton       = require('./RightButton'),
    Icon              = require('MaterialIcons'),
    RCTRefreshControl = require('RCTRefreshControl'),
    /* Styles */
    {
        Stylesheet,
        VenuesStyles,
        ListStyles
        } = require('../utils/Styles'),
    /* React */
    {
        View,
        Text,
        Component,
        ListView,
        TouchableHighlight,
        } = React,
    /* Options */
    LISTVIEW     = 'ListView',
    GPSOptions   = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 1000
    },
    /* Data Source */
    baseDataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
    });

/**
 * Venues View
 */
class VenuesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: baseDataSource,
            isLoading: false
        };
    }

    componentDidMount() {
        // Turn Geo Callback into a promise
        var geoPromiseResolve,
            refPromise = Data.load('https://lunchify.firebaseio.com/areas/keilaniemi/venues.json'),
            geoPromise = new Promise(function(resolve) {
                geoPromiseResolve = resolve;
            }),
            _this = this;

        // Wait for all promises to resolve
        Promise.all([refPromise, geoPromise]).then(([response, initialPosition]) => {
            // Calc Distances
            var venues = _this.calcDistances(response, initialPosition);

            // Set State
            _this.setState({
                venues: venues,
                dataSource: baseDataSource.cloneWithRows(venues)
            });
        });

        // Call Geo location
        //navigator.geolocation.getCurrentPosition(geoPromiseResolve);
        (geoPromiseResolve)({coords: {latitude: 60.1764360, longitude: 24.8306610}});

        // ScrollView
        RCTRefreshControl.configure({
            node: this.refs[LISTVIEW]
        }, () => {
            this.recalcDistance();
        });
    }

    calcDistances(data, geo) {
        // Calc Distances
        for(var index in data) {
            var item = data[index];

            item.distance = Helpers.calcDistance({
                lat: geo.coords.latitude,
                lng: geo.coords.longitude
            }, {
                lat: item.lat,
                lng: item.lng
            });
        };

        // Closest first
        data.sort((a, b) => {
            return a.distance - b.distance;
        });

        return data;
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

    getDate() {
        return moment('2015-06-05').format('YYYY-MM-DD');
    }

    toVenue(venue, view) {
        var refUrl = "https://lunchify.firebaseio.com/areas/keilaniemi/meals/" +
                venue.id + "/" + this.getDate() + ".json",
            refPromise = Data.load(refUrl);

        // Start Loading
        view.setState({ isLoading: true });

        // Get promised data
        refPromise.then((response) => {
            view.setState({ isLoading: false });

            this.props.nav.push({
                title: venue.name,
                component: VenueView,
                data: {
                    venue: venue,
                    menu: response
                },
                rightButton: RightButton({
                    title: 'Map',
                    icon: 'map',
                    component: MapView,
                    data: venue,
                    navigator: this.props.nav
                })
            });
        });
    }

    renderVenue(venue) {
        return (
            <VenuesItemView
                onPress={this.toVenue.bind(this, venue)}
                isLoading={this.state.isLoading}
                venue={venue}
                />
        )
    }

    renderLoading() {
        if( this.state.dataSource.getRowCount() === 0 ) {
            return (
                <Loading>closest venues...</Loading>
            );
        }
    }

    render() {
        return (
            <View style={Stylesheet.flex}>
                {this.renderLoading.call(this)}
                <ListView
                    ref={LISTVIEW}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderVenue.bind(this)}
                    />
            </View>
        )
    }
}

/**
 * Styles
 */
module.exports = VenuesView;
