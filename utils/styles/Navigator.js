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
            backgroundColor: '#F5F7FA',
            marginTop: 64,
            flex: 1
        },
        backButtonText: {
            fontWeight: '400',
            fontSize: 17
        },
        icon: {
            marginLeft: 8,
            marginRight: 8,
            marginTop: 6,
            width: 24,
            height: 24,
            color: 'white'
        },
        navBarText: {
            fontSize: 18,
            marginTop: 8,
            fontFamily: variables.fontFamily
        },
        navBarTitleText: {
            //color: cssVar('fbui-bluegray-60'),
            fontWeight: 'bold',
            marginVertical: 10,
            color: 'white'
        },
        navBarButtonText: {
            //color: cssVar('fbui-accent-blue'),
            fontSize: 16,
            color: 'white',
            marginTop: 10,
        },
        navBarLeftButton: {
            paddingLeft: 10,
        },
        navBarRightButton: {
            paddingRight: 10,
        },
        navbarLogo: {
            marginVertical: 10
        }
    });
});