"use strict"

var parser = require('../app/parser');
var expect = require('chai').expect;

var someText = "Monday 27th - Colin - Spaghetti Carbonara";
var May4th = "2015-05-04";

describe('Parser', function(){
    describe('parse', function(){
        it('should be a function', function(){
            expect(parser.parse).to.be.a('function');
        });
        it('should return an object', function(){
            expect(parser.parse(someText, May4th)).to.be.a('object');
        });
        it('should return an object with "when", "who" and "what" properties', function(){
            var result = parser.parse(someText, May4th);
            expect(result.when).to.be.a('array');
            expect(result.who).to.be.a('array');
            expect(result.what).to.be.a('array');
        });
        it('should parse dates from day names, at the start of text', function(){
            // 4th May 2015 was a Monday
            expect(parser.parse('Monday - Person - Food', May4th).when).to.deep.equal(['2015-05-04']);
            expect(parser.parse('Tuesday - Person - Food', May4th).when).to.deep.equal(['2015-05-05']);
            expect(parser.parse('Wednesday - Person - Food', May4th).when).to.deep.equal(['2015-05-06']);
            expect(parser.parse('Thursday - Person - Food', May4th).when).to.deep.equal(['2015-05-07']);
            expect(parser.parse('Friday - Person - Food', May4th).when).to.deep.equal(['2015-05-08']);
            expect(parser.parse('Saturday - Person - Food', May4th).when).to.deep.equal(['2015-05-09']);
            expect(parser.parse('Sunday - Person - Food', May4th).when).to.deep.equal(['2015-05-10']);
        });
        it('should parse dates from a short name, at the start of text', function(){
            expect(parser.parse('Mon - Person - Food', May4th).when).to.deep.equal(['2015-05-04']);
            expect(parser.parse('Tues - Person - Food', May4th).when).to.deep.equal(['2015-05-05']);
            expect(parser.parse('Tue - Person - Food', May4th).when).to.deep.equal(['2015-05-05']);
            expect(parser.parse('Wed - Person - Food', May4th).when).to.deep.equal(['2015-05-06']);
            expect(parser.parse('Thurs - Person - Food', May4th).when).to.deep.equal(['2015-05-07']);
            expect(parser.parse('Thur - Person - Food', May4th).when).to.deep.equal(['2015-05-07']);
            expect(parser.parse('Fri - Person - Food', May4th).when).to.deep.equal(['2015-05-08']);
            expect(parser.parse('Sat - Person - Food', May4th).when).to.deep.equal(['2015-05-09']);
            expect(parser.parse('Sun - Person - Food', May4th).when).to.deep.equal(['2015-05-10']);
        });
        it('should parse dates in different cases', function(){
            expect(parser.parse('mon - person - food', May4th).when).to.deep.equal(['2015-05-04']); 
            expect(parser.parse('MON - person - food', May4th).when).to.deep.equal(['2015-05-04']); 
            expect(parser.parse('MOn - person - food', May4th).when).to.deep.equal(['2015-05-04']); 
        });
        it('should parse "who" between two hyphens', function(){
            expect(parser.parse('Monday - Colin - Food', May4th).who).to.deep.equal(['Colin']);
        });
        it('should parse "what" after two hyphens', function(){
            expect(parser.parse('Monday - Colin - Food', May4th).what).to.deep.equal(['Food']);
        });
    });
});

