/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

var {StyleSheet, PixelRatio} = require('react-native'),
    variables    = {
        brandColor: '#ED5565',
        cellPaddingHorizontal: 15,
        cellPaddingVertical: 10
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
            fontFamily: 'Lato',
        },
        margin: {
            marginBottom: 10,
        },
        white: {
            backgroundColor: 'white'
        },
        textContainer: {
            flex: 1,
            backgroundColor: 'white',
        },
        flex: {
            flex: 1,
        },
        flex_20: {
            flex: .2
        },
        flexCenter: {
            justifyContent: 'center',
            alignItems: 'center'
        }
    }),
    /**
     * Navigator
     */
    NavigatorStyle: StyleSheet.create({
        container: {
            flex: 1,
        },
        header: {
            backgroundColor: variables.brandColor
        },
        scene: {
            backgroundColor: '#E6E9ED'
        },
        navbarText: {
            color: 'white',
            fontSize: 18,
            margin: 10,
            marginTop: 15,
            fontWeight: 'bold',
            textAlign: 'center',
            alignItems: 'center',
        },
        backButtonText: {
            fontWeight: '400'
        },
        icon: {
            marginLeft: 8,
            marginTop: 6,
            width: 24,
            height: 24,
            color: 'white'
        },
        navbarLogo: {
            top: 3
        }
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
            marginLeft: 5,
            marginRight: 5,
        },
        infoCell: {
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            paddingHorizontal: variables.cellPaddingHorizontal,
            paddingVertical: variables.cellPaddingVertical,
        },
        arrow: {
            color: '#CCCCCC'
        },
        infoTitle: {
            height: 28,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 0,
            fontFamily: 'Lato'
        },
        infoAddress: {
            color: '#999999',
            fontSize: 13,
            fontWeight: '300'
        },
        byline: {
            padding: 0,
        },
        badge: {
            margin: 0,
            paddingLeft: 3,
            paddingRight: 3,
            backgroundColor: '#E6E9ED',
            borderColor: '#E6E9ED',
            borderRadius: 10,
            borderWidth: 4,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        badgeText: {
            margin: 0,
            padding: 0,
            fontSize: 9,
            backgroundColor: '#E6E9ED',
            flex: 1,
            fontWeight: 'bold'
        },
        badgeIcon: {
            marginRight: 2,
            color: '#666666'
        }
    }),
    /**
     * Venue View
     */
    VenueStyles: StyleSheet.create({
        header: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: variables.cellPaddingHorizontal
        },
        headerText: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            shadowColor: '#222',
            shadowOpacity: 0.3,
            shadowRadius: 1,
        }
    }),
    /**
     * Indicator
     */
    IndicatorStyles: StyleSheet.create({
        wrapper: {
            backgroundColor: '#ffffff',
            height: 60,
            marginTop: 10,
        },
    })
};