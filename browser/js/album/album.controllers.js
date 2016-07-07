'use strict';

juke.controller('AlbumCtrl', function ($scope, $rootScope, $log,
                                       StatsFactory, AlbumFactory, PlayerFactory) {

  // load our initial data
  // var albums;

  // AlbumFactory.fetchAll()
  //   .then(function (albums) {
  //     albums = albums;
  //   });
  $scope.$on('viewSwap', function (event, data) {
    if (data.name !== 'oneAlbum') {
      $scope.showMe = false;
      return;}

    AlbumFactory.fetchById(data.albumId)
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
        $scope.showMe = (data.name === 'oneAlbum');
      })
    })
    .catch($log.error);

  });

   // $log service can be turned on and off; also, pre-bound

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




});
