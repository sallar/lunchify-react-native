/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 6/4/15.
 */
var {StyleSheet} = require('react-native');

module.exports = ((variables) => {
    return StyleSheet.create({
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
    });
});