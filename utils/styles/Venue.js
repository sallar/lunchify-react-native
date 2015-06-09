/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 6/4/15.
 */
var {StyleSheet} = require('react-native');

module.exports = ((variables) => {
    return {
        Main: StyleSheet.create({
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
            },
            spacer: {
                marginBottom: 3
            }
        }),
        textStyles: StyleSheet.create({
            p: {
                fontSize: 16,
                fontFamily: variables.fontFamily,
                fontWeight: '500',
                paddingBottom: 5
            },
            span: {
                fontFamily: variables.fontFamily,
                color: '#999'
            },
            a: {
                fontWeight: '500',
                fontFamily: variables.fontFamily,
                color: '#007AFF',
            }
        })
    };
});