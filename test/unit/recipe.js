/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Recipe = require('../../app/models/recipe');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var cp = require('child_process');
var db = 'iron-chef';

describe('Recipe', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(){
      done();
    });
  });
  describe('constructor', function(){
    it('should create a new Recipe object', function(){
      var o = {name:'Roasted Carrots with Cardamom Butter', photo:'url', ingredients:'a,b,c,d', directions:'e,f,g,h', category:'rabbit food' };
      var r1 = new Recipe(o);
      expect(r1).to.be.instanceof(Recipe);
      expect(r1.name).to.equal('Roasted Carrots with Cardamom Butter');
      expect(r1.ingredients).to.have.length(4);
      expect(r1.directions).to.have.length(4);
      expect(r1.date).to.be.instanceof(Date);
    });
    describe('.create', function(){
      it('should create an recipe', function(done){
        var o = {name:'Roasted Carrots with Cardamom Butter', photo:'url', ingredients:'a,b,c,d', directions:'e,f,g,h', category:'rabbit food' };
        Recipe.create(o, function(err, recipe){
          expect(recipe._id).to.be.instanceof(Mongo.ObjectID);
          done();
        });
      });
    });
    describe('.all', function(){
      it('should get all recipes from database', function(done){
        Recipe.all(function(err, recipes){
          expect(recipes).to.have.length(3);
          done();
        });
      });
    });
  });
  describe('.destroy', function(){
    it('should delete a recipe by its id', function(done){
      var _id = '100000000000000000000001';
      Recipe.destroy(_id, function(){
        Recipe.all(function(err, recipes){
          expect(recipes).to.have.length(2);
          done();
        });
      });
    });
  });
// Last Bracket
});
