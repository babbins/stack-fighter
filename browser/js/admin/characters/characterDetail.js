app.config(function($stateProvider){
  $stateProvider.state('adminCharacterDetail', {
    url: '/admin/character/:id',
    templateUrl: 'js/admin/characters/characterDetail.html',
    controller: 'AdminCharacterDetailCtrl',
    resolve: {
      character: function(characterFactory, $stateParams){
        return characterFactory.getById($stateParams.id);
      },
      allCategories: function(CategoryFactory){
        return CategoryFactory.getAll().then(CategoryFactory.separate);
      }
    }
  });
  $stateProvider.state('adminCharacterDetail.edit', {
    url: '/edit',
    templateUrl: 'js/admin/characters/editCharacter.html'
  })
})

app.controller('AdminCharacterDetailCtrl', function($scope, $state, characterFactory, allCategories, CategoryFactory, character){
  $scope.character = character;
  $scope.allCategories = allCategories;
  $scope.character.categories = CategoryFactory.organize($scope.character.categories);
  
  $scope.removeCharacter = function(){
    return characterFactory.removeChar(character.id).then(() => $state.go('adminCharacters'));
  }

  $scope.updateCharacter = function(charToUpdate){
    charToUpdate.categories = charToUpdate.categories.map(n => +n);
    characterFactory.updateChar(character.id, charToUpdate)
    .then(updatedChar => {

      $state.go('adminCharacterDetail', {id: updatedChar.id});
    })
    .catch(console.error.bind(console));
  };
});
