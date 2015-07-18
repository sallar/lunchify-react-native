/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 6/7/15.
 */
'use strict';

var React = require('react-native'),
    Store = require('react-native-store'),
    Helpers = require('./Helpers'),
    moment = require('moment');

class DataStore {
    /**
     * Load a url from remote or db
     * and return a promise
     * @param url {string}
     * @returns {Promise}
     */
    load(url) {
        var hash  = Helpers.hash(url),
            _this = this,
            resolve,
            promise;

        //Make a new promise
        promise = new Promise(function(accept) {
            resolve = accept;
        });

        // Get Data
        Store.table("jsonData").then(function(cache) {
            var rows = cache.where({url: hash}).find();

            // Fetching data
            if(rows.length === 0) {
                _this.fetchData(cache, url, hash, resolve);
            }
            // Load from DB
            else {
                _this.loadData(rows, resolve, cache, url);
            }
        });

        return promise;
    }

    /**
     * Fetch remote data and resolve the promise
     * @param db
     * @param url
     * @param hash
     * @param resolve
     * @returns {void}
     */
    fetchData(db, url, hash, resolve) {
        fetch(url).then((response) => {
            return response.json();
        }).done((json) => {
            // Add Data
            db.add({
                url: hash,
                date: moment().format(),
                content: JSON.stringify(json)
            });

            // Resolve
            resolve(json);
        });
    }

    /**
     * Returns db data and resolves the promise
     * @param rows
     * @param resolve
     * @param db
     * @param url
     */
    loadData(rows, resolve, db, url) {
        var row  = rows[0],
            now  = moment(),
            date = moment(row.date);

        // If it’s new, just deliver it.
        if(now.diff(date, 'hours') < 5) {
            resolve(JSON.parse(row.content));
        }
        // If it’s older than 5 hours, download again
        else {
            // Remove
            db.where({
                url: row.url
            }).remove();
            // Download Again
            this.fetchData(db, url, row.url, resolve);
        }
    }
}

module.exports = new DataStore;