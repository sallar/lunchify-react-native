/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 6/4/15.
 */
var {StyleSheet} = require('react-native');

module.exports = ((variables) => {
    return StyleSheet.create({
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
    });
});