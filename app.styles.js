'use strict';

var React  = require('react-native');
var {
    StyleSheet,
    } = React;

var variables = {
    brandColor: '#ED5565'
};

var stylesheet = StyleSheet.create({
    text: {
        fontFamily: 'Avenir',
    },
    margin: {
        marginBottom: 10,
    },
    navbarText: {
        color: 'white',
        fontSize: 17,
        margin: 10,
        marginTop: 15,
        fontWeight: '600',
        textAlign: 'center',
        alignItems: 'center',
    },
    headerStyle: {
        backgroundColor: variables.brandColor
    }
});

var venuesStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    page: {
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
    },
    centerItems: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20
    },
});

module.exports = {
    Variables: variables,
    Stylesheet: stylesheet,
    VenuesStyles: venuesStyles
};