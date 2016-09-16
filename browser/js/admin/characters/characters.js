app.config(function($stateProvider){
  $stateProvider.state('adminCharacters', {
    url: '/admin/characters',
    templateUrl: 'js/admin/characters/characters.html',
    controller: 'AdminCharactersCtrl',
    resolve: {
      characters: function(characterFactory){
        return characterFactory.getAll();
      }
    }

  })
})

app.controller('AdminCharactersCtrl', function($scope, characterFactory, characters){
  console.log(characters);
  $scope.characters = characters;

});
