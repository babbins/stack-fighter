app.config(function($stateProvider){
  $stateProvider.state('adminCharacterDetail', {
    url: '/admin/character/:id',
    templateUrl: 'js/admin/characters/characterDetail.html',
    controller: 'AdminCharacterDetailCtrl',
    resolve: {
      character: function(characterFactory, $stateParams){
        return characterFactory.getById($stateParams.id);
      }
    }

  })
})

app.controller('AdminCharacterDetailCtrl', function($scope, AdminFactory, character){
  $scope.character = character;
});
