'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log,
                                       StatsFactory, AlbumFactory, PlayerFactory) {

  // load our initial data
  AlbumFactory.fetchAll()
  .then(function (albums) {
    return AlbumFactory.fetchById(albums[0].id);
  })
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;
    StatsFactory.totalTime(album)
    .then(function(albumDuration) {
      $scope.fullDuration = albumDuration;
    })
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.start(song, $scope.album.songs);
    }
  };
  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  }

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  $scope.$on('viewSwap', function (event, data) {
    $scope.showMe = (data.name === 'oneAlbum');
  });


});
