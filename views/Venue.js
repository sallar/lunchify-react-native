/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';
/**
 * Required Modules
 */
var React        = require('react-native'),
    moment       = require('moment'),
    Helpers      = require('../utils/Helpers'),
    Icon         = require('MaterialDesign'),
    ParallaxView = require('react-native-parallax-view'),
    HTMLView     = require('react-native-htmlview'),
    {Stylesheet, VenueStyles, ListStyles} = require('../utils/Styles');

var {
    View,
    Text,
    Component,
    TouchableHighlight,
    ListView,
    } = React;

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

/**
 * Venues View
 */
class VenueView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venue: props.data,
            dataSource: baseDataSource
        }
    }

    componentDidMount() {
        var refPromise = fetch("https://lunchify.firebaseio.com/areas/keilaniemi/meals/" +
                this.state.venue.id + "/" + this.getDate() + '.json');
        var _this = this;

        // Get promised data
        refPromise.then((response) => {
            return response.json();
        }).then((response) => {
            // Set state
            this.setState({
                dataSource: baseDataSource.cloneWithRows(_this.processRows(response)),
                rawMenu: response
            });
        });
    }

    getDate() {
        return moment().format('YYYY-MM-DD');
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
        return (
            <ParallaxView
                backgroundSource={{uri: 'http://192.168.11.2/ravintola-maukas.jpg'}}
                windowHeight={150}
                >
                <View style={Stylesheet.flex}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMeal.bind(this)}
                        />
                </View>
            </ParallaxView>
        )
    }
}

class VenueItemView extends Component{
    render() {
        var {meal} = this.props;

        return (
            <View style={Stylesheet.white}>
                    <View style={[ListStyles.row, ListStyles.itemRow]}>
                        <View style={ListStyles.infoCell}>
                            <HTMLView value={meal.name}/>
                            <HTMLView value={meal.name_fi}/>
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
