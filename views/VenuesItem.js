/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 19.06.2015
 */
'use strict';

/**
 * Required Modules
 */
var React   = require('react-native'),
    moment  = require('moment'),
    Helpers = require('../utils/Helpers'),
    Icon    = require('react-native-vector-icons/MaterialIcons'),
    /* Styles */
    {
        Stylesheet,
        VenuesStyles,
        ListStyles,
        } = require('../utils/Styles'),
    /* React */
    {
        View,
        Text,
        Component,
        TouchableHighlight,
        ActivityIndicatorIOS,
        } = React;

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
module.exports = VenuesItemView;
