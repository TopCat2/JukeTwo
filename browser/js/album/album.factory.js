'use strict';

juke.factory('AlbumFactory', function($http){
  // non-UI logic in here
  var factoryObj = {};

  factoryObj.fetchAll = function() {
    return $http.get('/api/albums/')
    .then(function (res) { return res.data; })
  }

  factoryObj.fetchById = function(id) {
    return $http.get('/api/albums/' + id) // temp: get one
    .then(function (res) { return res.data; })
  }

  return factoryObj;
});


juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(Math.round(sum));
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});
