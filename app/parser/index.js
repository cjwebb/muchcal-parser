"use strict"

var moment = require('moment'),
    _      = require('lodash');

var calendarFormat = 'YYYY-MM-DD';

var days = [
    ["monday","mon"],
    ["tuesday","tue","tues"],
    ["wednesday","wed"],
    ["thursday","thu","thur","thurs"],
    ["friday","fri"],
    ["saturday","sat"],
    ["sunday","sun"]
]

var dayNames = function(token, contextDate){
    var token = token.toLowerCase();
    var context = moment(contextDate, calendarFormat); 
    var dates = [];
    _.forEach(days, function(d, index){
        if (_.includes(d, token)) {
            // momentjs is not zero-indexed
            var date = context.isoWeekday(index + 1).format(calendarFormat);
            dates.push(date);
        }
    });
    return dates;
};


// we assume data comes in the format 'when - who - what'
exports.parse = function(text, context) {
    var tokens = text.split(" ");
    var when = dayNames(tokens[0], context);

    var who = [];
    var what = [];
    var splitByHyphens = text.split("-");
    if (splitByHyphens[1]) who = [ splitByHyphens[1].trim() ];
    if (splitByHyphens[2]) what = [ splitByHyphens[2].trim() ];

    return {
        when: when,
        who: who,
        what: what
    };
};

