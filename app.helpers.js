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