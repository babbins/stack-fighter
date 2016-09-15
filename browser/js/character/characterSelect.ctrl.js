app.controller('CharacterSelectCtrl', function($scope, characters){
  
  $scope.characters = characters;

  $scope.selectedCharacter = characters[0];

  $scope.selectCharacter = function(character){
    $scope.selectedCharacter = character;
  };

  $scope.addToCart = function(quantity, character){
    console.log("This Button was pressed yo!", quantity, character);
  };

});
