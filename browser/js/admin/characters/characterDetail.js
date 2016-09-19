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
      },
      reviews: function(characterFactory, $stateParams){
        return characterFactory.getRevsById($stateParams.id)
      }
    }
  });
  $stateProvider.state('adminCharacterDetail.edit', {
    url: '/edit',
    templateUrl: 'js/admin/characters/editCharacter.html'
  })
})

app.controller('AdminCharacterDetailCtrl', function($scope, $state, characterFactory, reviews, allCategories, CategoryFactory, character){
  $scope.character = character;
  $scope.reviews = reviews;
  $scope.character.newCategories = [];
  $scope.allCategories = allCategories;
  $scope.editCategories = $scope.character.categories;

  $scope.character.categories = CategoryFactory.organize($scope.character.categories);
  console.log('allCats',allCategories);
  console.log('charCats',$scope.character.categories)
  $scope.removeCharacter = function(){
    return characterFactory.removeChar(character.id).then(() => $state.go('adminCharacters'));
  }
  $scope.removeCategory = function(index){
    $scope.editCategories.splice(index, 1);
  }

  $scope.addCategories = function(){
    $scope.character.newCategories = $scope.character.newCategories.map(n => +n).filter(n => n!==0);
    $scope.character.newCategories.forEach(function(newId){
      $scope.allCategories.forEach(function(type){
        type.forEach(function(category){
          if(category.id){
            if (category.id === newId && !$scope.editCategories.includes(category)){
              $scope.editCategories.push(category);
            }
          }
        })
      })
    })
    $scope.character.newCategories = [];
  }
  $scope.removeReview = function(id){
    characterFactory.removeRevs(id).then($state.go('adminCharacterDetail', {id: character.id}, {reload: true}));
  }
  $scope.updateCharacter = function(charToUpdate){
    delete charToUpdate.categories;
    $scope.editCategories = $scope.editCategories.map(category => category.id);
    console.log($scope.editCategories);
    charToUpdate.price = +charToUpdate.price;
    console.log(charToUpdate);
    var data = [charToUpdate, $scope.editCategories];
    characterFactory.updateChar(character.id, data)
    .then(updatedChar => {
      $state.go('adminCharacterDetail', {id: updatedChar.id}, {reload: true});
    })
    .catch(console.error.bind(console));
  };
});
