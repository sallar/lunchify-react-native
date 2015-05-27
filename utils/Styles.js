/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

var {StyleSheet, PixelRatio} = require('react-native'),
    variables    = {
        brandColor: '#ED5565',
        cellPadding: 8
    };

module.exports = {
    /**
     * Variables
     */
    Variables: variables,
    /**
     * Global
     */
    Stylesheet: StyleSheet.create({
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
        },
        white: {
            backgroundColor: 'white'
        },
        textContainer: {
            flex: 1,
            backgroundColor: 'white',
        },
    }),
    /**
     * Venues
     */
    VenuesStyles: StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white'
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
    }),
    /**
     * Loading
     */
    LoadingStyles: StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
        },
        loading: {
            justifyContent: 'space-around',
            margin: 50,
            height: 70,
        },
    }),
    /**
     * List Styles
     */
    ListStyles: StyleSheet.create({
        row: {
            alignItems: 'center',
            backgroundColor: 'white',
            flexDirection: 'row',
        },
        itemRow: {
            height: 70,
            alignItems: 'stretch',
            backgroundColor: 'white',
        },
        cellBorder: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            height: 1 / PixelRatio.get(),
            marginLeft: 4,
        },
        infoCell: {
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            padding: variables.cellPadding,
        },
        infoTitle: {
            height: 30,
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 2,
            fontFamily: 'Avenir'
        },
        infoAddress: {
            color: '#999999',
            fontSize: 13,
        },
        byline: {
            padding: 0,
        },
        badge: {
            margin: 0,
            padding: 0,
            backgroundColor: '#dddddd',
            borderColor: '#dddddd',
            borderRadius: 10,
            borderWidth: 4,
        },
        badgeText: {
            margin: 0,
            padding: 0,
            fontSize: 9,
            backgroundColor: '#dddddd',
        },
    })
};