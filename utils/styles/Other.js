/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 6/4/15.
 */
var {StyleSheet} = require('react-native');

module.exports = ((variables) => {
    return {
        Loading: StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            loading: {
                justifyContent: 'space-around',
                margin: 50,
                height: 70,
            },
        }),

        Indicator: StyleSheet.create({
            wrapper: {
                backgroundColor: '#ffffff',
                height: 60,
                marginTop: 10,
            },
        })
    }
})();