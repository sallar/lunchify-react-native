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

    stripTags(str) {
        return str.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, "");
    }

    stripSpaces(str) {
        return str.replace(/\s\s+/g, ' ');
    }

    hash(str) {
        if (typeof str !== 'string') {
            str = str + "";
        }
        /*jshint bitwise:false */
        var i, l,
            hval = 0x811c9dc5, // Seed,
            asString = true;

        for (i = 0, l = str.length; i < l; i+=1) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        if( asString ){
            // Convert to 8 digit hex string
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
        }
        return hval.toString() >>> 0;
    }

    toArray(object) {
        var arr = [];

        for(var index in object) {
            if(object.hasOwnProperty(index)) {
                arr.push(object[index]);
            }
        }

        return arr;
    }
}

module.exports = new Helpers;