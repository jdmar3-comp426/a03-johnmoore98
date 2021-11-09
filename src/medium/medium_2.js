import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        city: mpg_data.reduce( (previous_val, curr_val) => curr_val.city_mpg + previous_val, 0) / mpg_data.length,
        highway: mpg_data.reduce( (previous_val, curr_val) => curr_val.highway_mpg + previous_val, 0) / mpg_data.length
    },
    allYearStats: getStatistics(Array.from(mpg_data, x => x.year)),
    ratioHybrids: mpg_data.filter(x => x.hybrid == true).length / mpg_data.length
}
;

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: getMakerHybrids(),
    avgMpgByYearAndHybrid: getavgMpgByYearAndHybrid()
};

/*
* @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
* a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
* in descending order.
*/

export function getMakerHybrids() {
    var obj = {}
    mpg_data.forEach(function(value) {
        if (value.hybrid == true) {
            if (obj[value.make] != undefined) {
                obj[value.make].push(value.id);
            } else {
                obj[value.make] = [value.id];
            }
        }
    })

    var arr = [];
    for (let maker in obj) {
        arr.push({
            make: maker,
            hybrids: obj[maker]
        })
    }
    return arr.sort( (val1, val2) => val2.hybrids.length-val1.hybrids.length);
}

export function getavgMpgByYearAndHybrid() {
    const year_list = []
    const obj = {}
    mpg_data.forEach(function(value) {
        if (!year_list.includes(value.year)) {
            year_list.push(value.year);
        }
    })
    
    year_list.forEach(function(year) {
        let year_cars_hybrid = mpg_data.filter(car => car.year == year && car.hybrid == true);
        let year_cars_notHybrid = mpg_data.filter(car => car.year == year && car.hybrid == false);
        obj[year] = {
            hybrid: {
                city: year_cars_hybrid.reduce((previous_val, current_val) => previous_val + current_val.city_mpg, 0) / year_cars_hybrid.length,
                highway: year_cars_hybrid.reduce((previous_val, current_val) => previous_val + current_val.highway_mpg, 0) / year_cars_hybrid.length
            },
            notHybrid: {
                city: year_cars_notHybrid.reduce((previous_val, current_val) => previous_val + current_val.city_mpg, 0) / year_cars_notHybrid.length,
                highway: year_cars_notHybrid.reduce((previous_val, current_val) => previous_val + current_val.highway_mpg, 0) / year_cars_notHybrid.length
            }
        }
    })

    return obj;
}