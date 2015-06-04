/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 6/4/15.
 */
var {StyleSheet} = require('react-native');

module.exports = ((variables) => {
    return StyleSheet.create({
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
            height: 1 / variables.pixelRatio,
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
    });
});