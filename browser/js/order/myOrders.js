app.config(function ($stateProvider) {
    $stateProvider.state('myOrders', {
        url: '/my-orders',
        templateUrl: 'js/order/myOrders.html',
        resolve: {
          orders: function(OrderFactory){
            return OrderFactory.getUserOrders();
          }
        },
        controller: function($scope, orders){
          console.log('ORDERS', orders);
          $scope.orders = orders;
        }
    });
});

app.factory('OrderFactory', function($http){
  return {
    getUserOrders: function(){
      return $http.get('/api/orders').then(res => res.data);
    }
  }
})
