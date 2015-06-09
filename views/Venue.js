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
    Icon         = require('MaterialDesign'),
    ParallaxView = require('react-native-parallax-view'),
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

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

/**
 * Venues View
 */
class VenueView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venue: props.data.venue,
            rawMenu: props.data.menu,
            dataSource: baseDataSource.cloneWithRows(this.processRows(props.data.menu))
        }
    }

    componentDidMount() {
        //// Set state
        //this.setState({
        //    dataSource: ,
        //
        //});
    }

    processRows(response) {
        var meals = [];

        for(var meal in response) {
            if(response.hasOwnProperty(meal)) {
                meals.push(response[meal]);
            }
        }

        return meals;
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

    render() {
        //return (
        //    <ParallaxView
        //        backgroundSource={require('image!placeholder')}
        //        windowHeight={180}
        //        >
        //        <View style={Stylesheet.flex}>
        //            <ListView
        //                dataSource={this.state.dataSource}
        //                renderRow={this.renderMeal.bind(this)}
        //                />
        //        </View>
        //    </ParallaxView>
        //)
        return (
            <ScrollView>
                <Image
                    source={require('image!placeholder')}
                    resizeMode="cover"
                    style={{
                        width: Screen.width,
                        height: 200
                    }} />

                <View style={Stylesheet.flex}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMeal.bind(this)}
                        />
                </View>
            </ScrollView>
        );
    }
}

class VenueItemView extends Component{
    render() {
        var {meal} = this.props;

        return (
            <View style={Stylesheet.white}>
                <View style={[ListStyles.row, ListStyles.itemRowFree]}>
                    <View style={ListStyles.infoCell}>
                        <HTMLView
                            value={"<p>" + Helpers.stripTags(meal.name) + "</p>"}
                            stylesheet={VenueStyles.textStyles} />
                        <View style={VenueStyles.Main.spacer}></View>
                        <HTMLView
                            value={"<span>" + Helpers.stripSpaces(meal.name_fi) + "</span>"}
                            stylesheet={VenueStyles.textStyles}
                            />
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
