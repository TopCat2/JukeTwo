'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {



  $scope.progress = function() {
    return PlayerFactory.getProgress() * 100;
  }

  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  }

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else if(PlayerFactory.getCurrentSong()===song) PlayerFactory.resume()
    else PlayerFactory.start(song);
  };


  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.previous;

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
