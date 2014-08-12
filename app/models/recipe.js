'use strict';

//var Mongo = require('mongodb');

function Recipe(o){
  this.name = o.name;
  this.photo = o.photo;
  this.ingredients = o.ingredients;
  this.directions = o.directions;

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
