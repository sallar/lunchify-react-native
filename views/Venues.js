/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';
/**
 * Required Modules
 */
var React     = require('react-native'),
    moment    = require('moment'),
    Loading   = require('./Loading'),
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
    ActivityIndicatorIOS,
} = React;

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

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
                    dataSource: baseDataSource.cloneWithRows(venues)
                });
            });
        });

        // Call Geo location
        navigator.geolocation.getCurrentPosition(resolution);
        //resolution({coords: {latitude: 60.1764360, longitude: 24.8306610}});

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

    getDate() {
        return moment('2015-06-05').format('YYYY-MM-DD');
    }

    toVenue(venue, view) {
        var refPromise = fetch("https://lunchify.firebaseio.com/areas/keilaniemi/meals/" +
            venue.id + "/" + this.getDate() + '.json');

        // Start Loading
        view.setState({ isLoading: true });

        // Get promised data
        refPromise.then((response) => {
            view.setState({ isLoading: false });
            return response.json();
        }).then((response) => {
            this.props.toRoute({
                name: venue.name,
                component: VenueView,
                titleComponent: TitleView,
                data: {
                    venue: venue,
                    menu: response
                }
            })
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
 * Item View
 */
class VenuesItemView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

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

    getIcon() {
        if(this.state.isLoading) {
            return (<ActivityIndicatorIOS size="small" animating={true} />);
        }
        return (<Icon name="keyboard-arrow-right" size={30} style={ListStyles.arrow}></Icon>);
    }

    renderArrow() {
        return (
            <View style={[Stylesheet.flex_20, Stylesheet.flexCenter, Stylesheet.white]}>
                {this.getIcon()}
            </View>
        );
    }

    onPress() {
        this.props.onPress(this);
    }

    render() {
        return (
            <View style={Stylesheet.white}>
                <TouchableHighlight underlayColor="transparent" onPress={this.onPress.bind(this)}>
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
