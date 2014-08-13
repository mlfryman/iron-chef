'use strict';

var Mongo = require('mongodb');

function Recipe(o){
  strip(o);
  this.name = o.name || 'Generic Recipe'; // sets default value
  this.photo = o.photo || 'http://38.media.tumblr.com/408dcb1bad16267a1707b3be1e506e93/tumblr_mhavzt7K871rbybp4o2_500.jpg';
  this.ingredients = o.ingredients || 'Food, Water, Bacon';
  this.ingredients = o.ingredients.split(',').map(function(i){return i.trim();});
  this.directions = o.directions || '1. Clean Kitchen, 2. Get Food, 3. Cook, 4. Eat, 5. Clean Kitchen';
  this.directions = o.directions.split(',').map(function(i){return i.trim();});
  this.date = new Date();
  this.category = o.category;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.create = function(o, cb){

  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

Recipe.all = function(cb){
  Recipe.collection.find().sort({date:-1}).toArray(cb);
};

Recipe.destroy = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Recipe.collection.remove({_id:_id}, cb);
};

module.exports = Recipe;

// PRIVATE HELPER FUNCTION

function strip(o){
  // stripping leading and following spaces from all properties inside of o that are strings
  var properties = Object.keys(o);
  properties.forEach(function(property){
    if(typeof o[property] === 'string'){
      o[property] = o[property].trim();
    }
  });
}
