'use strict';

juke.factory('PlayerFactory', function($http){
  var returnObj = {};
  var audio = document.createElement('audio');
  var currentlyPlaying = false;

  returnObj.start = function(song) {
    returnObj.pause();
    // enable loading new song
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
    currentlyPlaying = true;
  };

  returnObj.pause = function() {
    audio.pause()
    currentlyPlaying = false;
  };

  returnObj.resume = function() {
    audio.play();
    currentlyPlaying = true;
  };

  returnObj.isPlaying = function() {
    return currentlyPlaying;
  };

  returnObj.getCurrentSong = function() {

  };

  returnObj.next = function() {

  };

  returnObj.previous = function() {

  };

  returnObj.getProgress = function() {

  };




  return returnObj;
});
