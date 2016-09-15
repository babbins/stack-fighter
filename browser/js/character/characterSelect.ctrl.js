app.controller('CharacterSelectCtrl', function($scope, characters, CategoryFactory) {

  CategoryFactory.fetchAll()
    .then(function(data) {
      $scope.categories = data;
      return;
    })
    .then(function(waiting) {
      
      $scope.activeFilter = [];

      $scope.sortedCategories = CategoryFactory.separateTypes($scope.categories);
      console.log($scope.sortedCategories);
      $scope.characters = characters;

      $scope.selectedCharacter = characters[0];

      $scope.selectCharacter = function(character) {
        $scope.selectedCharacter = character;
      };

      $scope.addFilter = function(filter) {
        if (filter[0] !== '{') {
          return;
        }
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

      $scope.clearFilter = function() {
        $scope.activeFilter = [];
        console.log("hello!", $scope.activeFilter);
      };

      $scope.addToCart = function(quantity, character) {
        console.log("This Button was pressed yo!", quantity, character);
        console.log($scope.activeFilter);
      };

      $scope.addFilters = function(){
        console.log("Adding these filters! : ", $scope.activeFilter);
      }

    });

});