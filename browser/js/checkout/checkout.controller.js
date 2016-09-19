app.controller('CheckoutCtrl', function($scope, $sessionStorage, checkoutFactory){
  $scope.characters = $sessionStorage.cart
  $scope.total = $sessionStorage.total
  $scope.placeOrder = function(characters) {
    var characterIds = [];
    for (var index = 0; index < characters.length; index++) {
      var element = characters[index];
      characterIds.push(element.id)
    }
    checkoutFactory.placeOrder({characters: characterIds})
  }
})
