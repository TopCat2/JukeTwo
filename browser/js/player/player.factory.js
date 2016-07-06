'use strict';

juke.factory('PlayerFactory', function($http) {
    var returnObj = {};
    var audio = document.createElement('audio');
    var currentlyPlaying = false;
    var currentSong = null;
    var currentAlbumSongs = null;


    returnObj.start = function(song, songList) {
        returnObj.pause();
        // enable loading new song
        audio.src = song.audioUrl;
        audio.load();
        audio.play();
        currentlyPlaying = true;
        currentSong = song;
        currentAlbumSongs = songList;
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
        return currentSong;
    };

    function mod(num, m) {
        return ((num % m) + m) % m; }

    function skip(interval) {
        if (!currentSong) return;
        var index = currentAlbumSongs.indexOf(currentSong);
        index = mod((index + (interval || 1)), currentAlbumSongs.length);
        currentSong = currentAlbumSongs[index];
        returnObj.start(currentSong, currentAlbumSongs);
    }

    returnObj.next = function() {
        skip(1)
    };

    returnObj.previous = function() {
        skip(-1)
    };

    returnObj.getProgress = function() {
      if (!currentSong) return 0;
      return audio.currentTime/audio.duration
    };

    return returnObj;
});
