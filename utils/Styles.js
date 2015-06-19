/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

var {StyleSheet, PixelRatio} = require('react-native');
var variables = {
        //brandColor           : '#ED5565',
        brandColor           : '#DA4453',
        cellPaddingHorizontal: 15,
        cellPaddingVertical  : 10,
        pixelRatio           : PixelRatio.get(),
        fontFamily           : 'Lato'
    };

module.exports = {
    Variables       : variables,
    Stylesheet      : require('./styles/Base')(variables),
    NavigatorStyles : require('./styles/Navigator')(variables),
    ListStyles      : require('./styles/List')(variables),
    VenuesStyles    : require('./styles/Venues')(variables),
    VenueStyles     : require('./styles/Venue')(variables),
    AboutStyles     : require('./styles/About')(variables),
    LoadingStyles   : require('./styles/Other').Loading,
    IndicatorStyles : require('./styles/Other').Indicator
};