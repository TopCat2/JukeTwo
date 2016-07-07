'use strict';

juke.controller('SidebarCtrl', function ($rootScope, $scope) {

  $scope.viewAlbums = function() {
    $rootScope.$broadcast('viewSwap', {name: 'allAlbums'})
  }

  $scope.viewAllArtists = function() {
    $rootScope.$broadcast('viewSwap', {name: 'allArtists'})
  }
});
