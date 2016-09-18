app.config(function($stateProvider){
  $stateProvider.state('addCharacter', {
    url: '/admin/characters/add',
    templateUrl: 'js/admin/characters/addCharacter.html',
    controller: 'AdminAddCharacterCtrl',
    resolve: {
      categories: function(CategoryFactory){
        return CategoryFactory.getAll().then(CategoryFactory.separate);
      }
    }
  });
});

app.controller('AdminAddCharacterCtrl', function($scope, $state, characterFactory, CategoryFactory, categories){
  $scope.categories = categories;

  $scope.createCharacter = function(character){
    if(character.categories){
      var categoryIds = [];
      for(var key in character.categories){
        categoryIds.push(+character.categories[key]);
      }
      character.categories = categoryIds;
    }
    characterFactory.createChar(character)
    .then(char => {
      $state.go('characterDetail', {id: char.id});
    })
    .catch(console.error.bind(console));
  };
});
