app.controller('CheckoutCtrl', function($scope, $localStorage, checkoutFactory){
  $scope.$storage = $localStorage
  $scope.placeOrder = function(characters) {
    if(!characters.length){
      alert("Must have item(s) in the cart.");
      return;
    }
    console.log("CHARACTERS FROM CHECKOUT CTRL", characters);
    checkoutFactory.placeOrder({characters: characters})
  }
  $scope.clearCart = checkoutFactory.clearCart
  $scope.changeQuantity = function(character, change) {
    checkoutFactory.changeQuantity(character, change)

  }
  $scope.clearChar = function(character) {
    checkoutFactory.clearChar(character)
  }
})
