'use strict';

juke.factory('ArtistFactory', function($http, SongFactory){

var factoryObj = {};

factoryObj.fetchAll = function() {
  return $http.get('/api/artists/')
    .then(function (res) { return res.data; });
}

factoryObj.fetchById = function(id) {
    return $http.get('/api/artists/' + id) // temp: get one
    .then(function (res) { return res.data; })
  }

  factoryObj.fetchAlbumsById = function(id) {
    return $http.get('/api/artists/' + id +'/albums') // temp: get one
    .then(function (res) { return res.data; })
  }

  factoryObj.fetchSongsById = function(id) {
    return $http.get('/api/artists/' + id +'/songs') // temp: get one
    .then(function (res) {
      res.data.forEach(function(song) {
        SongFactory.setAudioUrl(song)
      })
      return res.data; })
  }

return factoryObj;



 });
