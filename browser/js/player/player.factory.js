'use strict';

juke.factory('PlayerFactory', function($http, $rootScope) {
    var returnObj = {};
    var audio = document.createElement('audio');
    var currentlyPlaying = false;
    var currentSong = null;
    var currentAlbumSongs = null;
    var currentProgress = 0;


    returnObj.start = function(song, songList) {
        returnObj.pause();
        // enable loading new song
        audio.src = song.audioUrl;
        audio.load();
        audio.play();
        currentlyPlaying = true;
        currentSong = song;
        if (songList) currentAlbumSongs = songList;
    };

    audio.addEventListener('ended', function () {
        returnObj.next();
        $rootScope.$evalAsync(); // likely best, schedules digest if none happening
    });

    audio.addEventListener('timeupdate', function () {
        currentProgress = audio.currentTime / audio.duration;
        $rootScope.$evalAsync(); // likely best, schedules digest if none happening
    });

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
        returnObj.start(currentSong);
    }

    returnObj.next = function() {
        skip(1)
    };

    returnObj.previous = function() {
        skip(-1)
    };

    returnObj.getProgress = function() {
      return currentProgress;
    };

    return returnObj;
});
