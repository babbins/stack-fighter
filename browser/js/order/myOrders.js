app.config(function ($stateProvider) {
    $stateProvider.state('myOrders', {
        url: '/my-orders',
        templateUrl: 'js/order/myOrders.html',
        resolve: {
          orders: function(OrderFactory, $stateParams){
            OrderFactory.getUserOrders($stateParams.id);
          }
        }
    });
});

app.factory('OrderFactory', function($http){
  return {
    getUserOrders: function(id){
      return: $http.get('/api/users')
    }
  }
})
