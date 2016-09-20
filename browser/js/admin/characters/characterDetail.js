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
        // KHWA: What does .separate do?
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
  $scope.character.newCategories = [];
  $scope.allCategories = allCategories;
  // KHWA: Consider angular.copy to avoid direct reference?
  $scope.editCategories = $scope.character.categories;
  $scope.character.categories = CategoryFactory.organize($scope.character.categories);
  // KHWA: We should avoid console logs in master
  console.log('allCats', allCategories);
  console.log('charCats', $scope.character.categories)
  // KHWA: We should use $state.reload OR just update the categories in the .then
  $scope.removeCharacter = function(){
    return characterFactory.removeChar(character.id).then(() => $state.go('adminCharacters'));
  }
  $scope.removeCategory = function(index){
    $scope.editCategories.splice(index, 1);
  }

  $scope.addCategories = function(){
    $scope.character.newCategories = $scope.character.newCategories.map( n => +n ).filter( n => n !== 0);
    $scope.character.newCategories.forEach(function(newId){
      $scope.allCategories.forEach(function(type){
        type.forEach(function(category){
          if (category.id){
            if (category.id === newId && !$scope.editCategories.includes(category)){
              $scope.editCategories.push(category);
            }
          }
        })
      })
    })
    $scope.character.newCategories = [];
  }
  $scope.updateCharacter = function(charToUpdate){
    delete charToUpdate.categories;
    $scope.editCategories = $scope.editCategories.map(category => category.id);
    // KHWA: We should avoid console logs in master
    console.log($scope.editCategories);
    charToUpdate.price = +charToUpdate.price;
    // KHWA: We should avoid console logs in master
    console.log(charToUpdate);
    var data = [charToUpdate, $scope.editCategories];
    characterFactory.updateChar(character.id, data)
    .then(updatedChar => {
      // KHWA: $state.reload() or $scope.$evalAsync()?
      $state.go('adminCharacterDetail', {id: updatedChar.id}, {reload: true});
    })
    // KHWA: We probably a growl or an alert here
    .catch(console.error.bind(console));
  };
});
