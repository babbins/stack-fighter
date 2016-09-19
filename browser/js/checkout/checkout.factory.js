app.factory('checkoutFactory', function($http, $state, $sessionStorage){
  var checkoutObj = {};
  checkoutObj.placeOrder = function(orderData) {
    $http.post('api/orders', orderData)
    .then(() => {
      $sessionStorage.cart = [];
      $sessionStorage.total = 0;
      $state.go('myOrders');
    })
  }
  checkoutObj.checkout = function(storage){
      console.log(storage);
    //   storage.cart;
    //   storage.total;
  }

  return checkoutObj
})
