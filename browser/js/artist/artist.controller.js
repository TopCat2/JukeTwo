'use strict';

juke.controller('ArtistCtrl', function ($scope, $rootScope, ArtistFactory) {

  ArtistFactory.fetchAll()
  .then(function(artists) {
    $scope.artists = artists;
  })

  $scope.viewOneArtist = function(artistId) {
    $rootScope.$broadcast('viewSwap', {name: 'oneArtist', artistId: artistId})
  }

  $rootScope.$on('viewSwap', function(event, data) {
    $scope.showMe = (data.name === 'allArtists');
  })


})
