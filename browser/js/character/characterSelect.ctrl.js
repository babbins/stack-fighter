app.controller('CharacterSelectCtrl', function($scope, characters, categories, CategoryFactory, $state) {

  $scope.categories = categories;

  $scope.activeFilter = [];

  $scope.sortedCategories = CategoryFactory.separateTypes($scope.categories);

  $scope.characters = characters;

  $scope.selectedCharacter = characters[0];

  $scope.selectCharacter = function(character) {
    $scope.selectedCharacter = character;
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
  };

  $scope.deleteFilter = function(filter) {
    var toDelete = $scope.activeFilter.indexOf(filter);
    $scope.activeFilter.splice(toDelete, 1);
  };

  $scope.clearFilter = function() {
    $state.reload();
    console.log("hello!", $scope.activeFilter);
  };

  $scope.addToCart = function(quantity, character) {
    console.log("This Button was pressed yo!", quantity, character);
    console.log($scope.activeFilter);
  };

  $scope.addFilters = function() {
    console.log("Adding these filters! : ", $scope.activeFilter);
  }
});