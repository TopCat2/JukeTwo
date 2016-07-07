'use strict';

juke.controller('OneArtistCtrl', function ($scope, $rootScope, ArtistFactory, AlbumFactory, PlayerFactory) {

  $rootScope.$on('viewSwap', function(event, data) {
    if (data.name !== 'oneArtist') {
      $scope.showMe = false;
      return;}
    var artistId = data.artistId
    ArtistFactory.fetchById(artistId)
    .then(function(artist) {
      $scope.artist = artist;
      return ArtistFactory.fetchAlbumsById(artistId)
    })
    .then(function(albums) {
      albums.forEach(function(album) {
        album.imageUrl = '/api/albums/' + album.id + '/image';

        AlbumFactory.fetchById(album.id)
        .then(function(alb) {
          album.numSongs = alb.songs.length
        })
      })
      $scope.albums = albums;
      return ArtistFactory.fetchSongsById(artistId)
    })
    .then(function(songs) {
      $scope.songs = songs;
      $scope.showMe = true;
    })
  })

  $scope.viewAlbum = function(id) {
    $rootScope.$broadcast("viewSwap", {name: 'oneAlbum', albumId: id})
  }

   $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.start(song, $scope.songs);
    }
  };
  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  }

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

})
