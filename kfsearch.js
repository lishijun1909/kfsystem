/*
 * Created with Sublime Text (buidl 3054).
 * User: soncy
 * Date: 2013-10-26
 * Time: 12:21:43
 * Contact: soncy1986@gmail.com
 */

var rd = require('rd'),
    reader = require('./lib/reader.js');

var files = rd.readSync('data');
files.shift();

/*
 * row[Object], csv title lowercase
 * index[Number]
 */
reader.read(files, function(row, index) {
    // every row info
}).on('end', function() {
    console.log('data end');
});
