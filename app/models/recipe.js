'use strict';

var Mongo = require('mongodb');

function Recipe(r){
  this.name = r.name;
  this.photo = r.photo;
  this.ingredients = [];
  this.directions = [];

}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

Recipe.all = function(cb){
  Recipe.collection.find().toArray(cb);
};

module.exports = Recipe;
