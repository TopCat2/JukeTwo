'use strict';

juke.controller('AlbumsCtrl', function ($scope, $rootScope, $log, AlbumFactory) {

  // load our initial data
  $scope.showAllAlbums = false;

  AlbumFactory.fetchAll()
  .then(function (albums) {
    var songPromise = [];
    albums.forEach(function(album) {
      album.imageUrl = '/api/albums/' + album.id + '/image';

      AlbumFactory.fetchById(album.id)
      .then(function(alb) {
        album.numSongs = alb.songs.length
      })
    })

    $scope.albums = albums;
  })
  .catch($log.error);

  $rootScope.$on('viewSwap', function(event, data) {
    $scope.showMe = (data.name === 'allAlbums');
  });

  $scope.viewOneAlbum = function () {
    $rootScope.$broadcast('viewSwap', { name: 'oneAlbum' });
  };

});
