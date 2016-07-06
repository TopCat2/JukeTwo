'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');
  audio.addEventListener('ended', function () {
    $scope.next();
    // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });
  audio.addEventListener('timeupdate', function () {
    $scope.progress = 100 * audio.currentTime / audio.duration;
    // $scope.$digest(); // re-computes current template only (this scope)
    $scope.$evalAsync(); // likely best, schedules digest if none happening
  });

  // state
  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  }

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.start(song);
  };

  // incoming events (from Album or toggle)


  // functionality
  // function pause () {
  //   audio.pause();
  //   $scope.playing = false;
  // }
  // function play (event, song){
  //   // stop existing audio (e.g. other song) in any case
  //   pause();
  //   $scope.playing = true;
  //   // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // enable loading new song
  //   $scope.currentSong = song;
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   audio.play();
  // }

  // // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { return PlayerFactory.next() };
  $scope.prev = function () { return PlayerFactory.previous() };

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
