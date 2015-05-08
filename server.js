"use strict"

var express      = require('express'),
    expValidator = require('express-validator'),
    bodyParser   = require('body-parser'),
    moment       = require('moment'),
    morgan       = require('morgan'),
    app          = express();

var parser       = require('./app/parser');

var calendarFormat = "YYYY-MM-DD";

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(expValidator({
    customValidators: {
        isCalendarFormat: function(value) {
            return moment(value, calendarFormat, true).isValid();                  
        }           
    }
}));

app.route('/parse/meals')
    .post(function(req, res){
        req.assert(['context','date'], "required in format " + calendarFormat).isCalendarFormat();
        req.assert(['text'], "required").notEmpty();

        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);

        var result = parser.parse(req.body.text, req.body.context.date);
        return res.json(result);
    })

app.listen(process.env.PORT || 10010);

