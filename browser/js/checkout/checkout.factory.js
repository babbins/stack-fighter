app.factory('checkoutFactory', function($http, $state, $localStorage){
  var checkoutObj = {};
  checkoutObj.placeOrder = function(orderData) {
    $http.post('api/orders', orderData)
    .then(() => {
      $localStorage.cart = [];
      $localStorage.total = 0;
      $state.go('myOrders');
    })
  }
  checkoutObj.clearCart = function() {
    $localStorage.cart = []
    $localStorage.total = 0
  }
  checkoutObj.changeQuantity = function(character, change) {
    change = Number(change)
    var charIdx = $localStorage.cart.indexOf(character)
    $localStorage.cart[charIdx].quantity += change
    if ($localStorage.cart[charIdx].quantity === 0) {
      $localStorage.cart.splice(charIdx, 1)
    }
    $localStorage.total += Number(character.price) * change
  }
  checkoutObj.clearChar = function(character) {
    var charIdx = $localStorage.cart.indexOf(character)
    $localStorage.total -= Number(character.price) * character.quantity
    $localStorage.cart.splice(charIdx, 1)
  }
  return checkoutObj
})
