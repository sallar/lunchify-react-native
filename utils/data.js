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
        })

        // Get Data
        Store.table("jsonData").then(function(cache) {
            var rows = cache.where({
                    url: hash
                }
            ).find();

            if(rows.length === 0) {
                // Fetching data
                _this.fetchData(cache, url, hash, resolve);
            } else {
                // Load from DB
                _this.loadData(rows, resolve);
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
        fetch(url).then(function(response) {
            return response.json();
        }).done(function(json) {
            // Convert to Array
            json = Helpers.toArray(json);

            // Add Data
            db.add({
                url: hash,
                date: moment().format(),
                content: JSON.stringify(Helpers.toArray(json))
            });

            // Resolve
            resolve(json);
        });
    }

    /**
     * Returns db data and resolves the promise
     * @param rows
     * @param resolve
     */
    loadData(rows, resolve) {
        resolve(JSON.parse(rows[0].content));
    }
}

module.exports = new DataStore;