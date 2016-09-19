app.controller('CharacterSelectCtrl', function($scope, characters, categories, characterFactory, CategoryFactory, $state, $sessionStorage) {
  $scope.$storage = $sessionStorage;
  if (!$sessionStorage.cart) $sessionStorage.cart = [];
  $scope.$storage.cart = $sessionStorage.cart
  $scope.$storage.total = $sessionStorage.total
  if (!$sessionStorage.total) $sessionStorage.total = 0
  $scope.categories = categories;

  $scope.activeFilter = [];

  $scope.sortedCategories = CategoryFactory.separateTypes($scope.categories);

  $scope.characters = characters;

  console.log($scope.characters);

  $scope.selectedCharacter = characters[0];

  $scope.selectCharacter = function(character) {
    $scope.selectedCharacter = character;
  };

  $scope.filter = function() {
    for (var k = 0; k < characters.length; k++) {
      var counter = 0;
      for (var i = 0; i < $scope.activeFilter.length; i++) {
        for (var j = 0; j < $scope.characters[k].categories.length; j++) {
          if ($scope.characters[k].categories[j].value === $scope.activeFilter[i].value) {
            counter++;
          }
        }
      }
      if (counter === $scope.activeFilter.length) {
        console.log('cool!')
        $scope.characters[k].inactive = false;
      } else {
        console.log('need to deactivate')
        $scope.characters[k].inactive = true;
        console.log($scope.characters[0]);
      }
    }
  };

  $scope.addFilter = function(filter) {
    console.log(filter);
    if (!filter[0]) return;
    filter = JSON.parse(filter);
    var added = false;
    if ($scope.activeFilter.length === 0) {
      $scope.activeFilter.push(filter);
      added = true;
    } else {
      for (var i = 0; i < $scope.activeFilter.length; i++) {
        if ($scope.activeFilter[i].type === filter.type) {
          $scope.activeFilter.splice(i, 1);
          $scope.activeFilter.push(filter);
          added = true;
        }
      }
    }
    if (!added) {
      $scope.activeFilter.push(filter);
    }
    $scope.filter();
  };

  $scope.go = function(state, payload){
    $state.go(state, payload);
  };

  $scope.deleteFilter = function(filter) {
    var toDelete = $scope.activeFilter.indexOf(filter);
    $scope.activeFilter.splice(toDelete, 1);
    $scope.filter();
  };

  $scope.clearFilter = function() {
    $state.reload();
  };

  $scope.addToCart = function(quantity, character) {
    $sessionStorage.cart.push(character)
    $sessionStorage.total += Number(character.price)
  };

  $scope.addFilters = function() {
    console.log("Adding these filters! : ", $scope.activeFilter);
  }
});