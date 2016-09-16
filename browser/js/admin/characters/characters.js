app.config(function($stateProvider){
  $stateProvider.state('adminCharacters', {
    url: '/admin/characters',
    templateUrl: 'js/admin/characters/characters.html',
    controller: 'AdminCharactersCtrl',
    resolve: {
      characters: function(AdminFactory){
        return AdminFactory.getCharacters();
      }
    }

  })
})

app.controller('AdminCharactersCtrl', function($scope, AdminFactory, characters){
  console.log(characters);
  $scope.characters = characters;
});
