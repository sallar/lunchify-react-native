/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date ${DATE}.
 */
var {StyleSheet} = require('react-native');

module.exports = StyleSheet.create({
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
    },
    fullscreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});