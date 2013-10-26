/*
 * Created with Sublime Text (buidl 3054).
 * User: soncy
 * Date: 2013-10-26
 * Time: 11:46:26
 * Contact: soncy1986@gmail.com
 */
var fs = require('fs'),
    csv = require('csv');

var KEY, PATHS, 
    allcount = 0, 
    current = 0;

function Reader() {
    this.events = {};
}

Reader.fn = Reader.prototype;

Reader.fn.read = function(paths, callback) {
    PATHS = paths;
    this.readNext(callback);
    return this;
}

Reader.fn.readNext = function(callback) {
    var self = this;
    var currPath = PATHS[current];
    if (currPath) {
        try{
            csv()
            .from.path(currPath, { delimiter: ',', escape: '"' })
            .on('record', function(row, index) {
                if (index === 0) {
                    KEY = row;
                }
                try{
                    callback(self.buildata(row), index, currPath);
                    alivecount ++;
                } catch(e) {
                    // console.log(row);
                }
            })
            .on('end', function(count) {
                current ++;
                allcount += count;
                self.readNext(callback);
            });
        } catch (e) {}
    } else {
        console.log('data end!');
        self.events['end'](allcount);
    }
}

Reader.fn.buildata = function(row) {
    var ret = {},
        i = 0,
        len = KEY.length;
    for (; i < len; i ++) {
        ret[KEY[i].trim().toLowerCase()] = row[i] ? row[i].trim() : null;
    }
    return ret;
}

Reader.fn.on = function(event, callback) {
    this.events[event] = callback;
    return this;
}

module.exports = new Reader();
