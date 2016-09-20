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
  // KHWA: We should remove logs from master
  console.log(characters);
  $scope.characters = characters;

});
