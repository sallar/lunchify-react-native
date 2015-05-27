/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

class Helpers {
    icon(icon: string) {
        return {
            uri: icon,
            isStatic: true
        }
    }
}

module.exports = new Helpers;