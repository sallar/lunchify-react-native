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

    calcDistance(startPoint, endPoint) {
        var RADIANS = Math.PI/180;
        var EARTH_RADIUS = 6371;

        var lat1, lat2, lng1, lng2;
        var x, y, a, c;

        lat1 = parseFloat(startPoint.lat) * RADIANS;
        lat2 = parseFloat(endPoint.lat) * RADIANS;

        lng1 = parseFloat(startPoint.lng) * RADIANS;
        lng2 = parseFloat(endPoint.lng) * RADIANS;

        x = Math.sin((lat2-lat1)/2);
        y = Math.sin((lng2-lng1)/2);

        // Harvesine formula
        a = x * x + Math.cos(lat1) * Math.cos(lat2) *y * y;
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        // distance
        return EARTH_RADIUS * c;
    }

    formatDistance(value) {
        return (value < 1) ? parseInt(value * 1000) + ' m' : value.toPrecision(2) + ' km';
    }
}

module.exports = new Helpers;