app.factory('checkoutFactory', function($http, $state, $localStorage){
  var checkoutObj = {};
  checkoutObj.placeOrder = function(orderData) {
    $http.post('api/orders', orderData)
    .then(() => {
      $localStorage.cart = [];
      $localStorage.total = 0;
      // KHWA: Maybe put this inside the controller and attach a .catch afterwards
      $state.go('myOrders');
    })
  }
  checkoutObj.clearCart = function() {
    $localStorage.cart = []
    $localStorage.total = 0
  }
  // KHWA: Perhaps we can centralize this logic or reuse it?
  // addToCart also has something similar
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
