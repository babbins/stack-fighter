app.config(function($stateProvider){
  $stateProvider.state('addCharacter', {
    url: '/admin/characters/add',
    templateUrl: 'js/admin/characters/addCharacter.html',
    controller: 'AdminAddCharacterCtrl',
    resolve: {
      categories: function(CategoryFactory){
        return CategoryFactory.getAll();
      }
    }
  });
});

app.controller('AdminAddCharacterCtrl', function($scope, CategoryFactory, categories){
  console.log(categories);
  $scope.categories = CategoryFactory.separate(categories);
  $scope.createCharacter = function(data){
    return characterFactory.create(data);
  };
});
