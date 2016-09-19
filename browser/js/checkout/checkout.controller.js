app.controller('CheckoutCtrl', function($scope, $localStorage, checkoutFactory){
  $scope.$storage = $localStorage
  $scope.placeOrder = function(characters) {
    var characterIds = [];
    for (var index = 0; index < characters.length; index++) {
      var element = characters[index];
      characterIds.push(element.id)
    }
    checkoutFactory.placeOrder({characters: characterIds})
  }
  $scope.clearCart = checkoutFactory.clearCart
  $scope.changeQuantity = function(character, change) {
    checkoutFactory.changeQuantity(character, change)

  }
  $scope.clearChar = function(character) {
    checkoutFactory.clearChar(character)
  }
})
