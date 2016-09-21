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
          $scope.orders = orders;
          // $scope.orders.forEach(order => {
          //   order.createdAt = new Date(date)
          // });
        }
    });
});
