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
    if (character.categories){
      var categoryIds = [];
      // KHWA: Room for optimization? Do we need this?
        // Coercing into numbers?
      for (var key in character.categories){
        categoryIds.push(+character.categories[key]);
      }
      character.categories = categoryIds;
    }
    characterFactory.createChar(character)
    .then(char => {
      $state.go('characterDetail', {id: char.id});
    })
    // KHWA: Maybe this should be a growl or an alert? Some type of feedback for the user / admin
    .catch(console.error.bind(console));
  };
});
