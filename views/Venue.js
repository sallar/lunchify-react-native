/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';
/**
 * Required Modules
 */
var React        = require('react-native'),
    Helpers      = require('../utils/Helpers'),
    Icon         = require('react-native-vector-icons/MaterialIcons'),
    HTMLView     = require('react-native-htmlview'),
    Screen       = require('Dimensions').get('window'),
    {Stylesheet, VenueStyles, ListStyles} = require('../utils/Styles');

var {
    View,
    Text,
    Component,
    TouchableHighlight,
    ListView,
    ScrollView,
    Image,
    } = React;

var baseDataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id
});

/**
 * Venues View
 */
class VenueView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            venue: props.data.venue,
            rawMenu: props.data.menu,
            dataSource: baseDataSource
        };
    }

    componentDidMount() {
        this.setState({
            dataSource: baseDataSource.cloneWithRows(this.state.rawMenu)
        });
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

    renderMeal(meal) {
        return(
            <VenueItemView meal={meal} />
        )
    }

    renderList() {
        if(this.state.rawMenu.length > 0) {
            return (
                <View style={Stylesheet.flex}>
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMeal.bind(this)}
                        />
                </View>
            );
        } else {
            return (
                <View style={[Stylesheet.flex, Stylesheet.flexCenter]}>
                    <Text style={Stylesheet.text}>This Venue is Closed Today.</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={Stylesheet.flex}>
                <Image
                    source={require('image!placeholder')}
                    resizeMode="cover"
                    style={{
                    width: Screen.width,
                    height: 200
                }}/>
                {this.renderList()}
            </View>
        );
    }
}

class VenueItemView extends Component{
    render() {
        var {meal} = this.props;

        var name = meal.name ? meal.name : meal.name_alt,
            nameAlt = meal.name ? meal.name_alt : null,
            nameAltView = (<View></View>);

        if(nameAlt) {
            nameAltView = (
                <HTMLView
                    value={"<span>" + nameAlt + "</span>"}
                    stylesheet={VenueStyles.textStyles}
                    />
            );
        }

        return (
            <View style={Stylesheet.white}>
                <View style={[ListStyles.row, ListStyles.itemRowFree]}>
                    <View style={ListStyles.infoCell}>
                        <HTMLView
                            value={"<p>" + name+ "</p>"}
                            stylesheet={VenueStyles.textStyles} />
                        <View style={VenueStyles.Main.spacer}></View>
                        {nameAltView}
                    </View>
                </View>
                <View style={ListStyles.cellBorder} />
            </View>
        )
    }
}

/**
 * Export
 */
module.exports = VenueView;
