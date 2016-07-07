'use strict';

juke.factory('SongFactory', function($http){
  // non-UI logic in here
  var factoryObj = {};

    factoryObj.setAudioUrl = function(song) {
    song.audioUrl = '/api/songs/' + song.id + '/audio';
  }

  return factoryObj;
})
