/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 6/4/15.
 */
var {StyleSheet} = require('react-native');

module.exports = ((variables) => {
    return StyleSheet.create({
        container  : {
            flex           : 1,
            backgroundColor: 'white'
        },
        page       : {
            paddingTop  : 10,
            paddingRight: 10,
            paddingLeft : 10,
        },
        centerItems: {
            alignItems    : 'center',
            justifyContent: 'center',
        },
        text       : {
            textAlign: 'center',
            fontSize : 20
        },
    });
});