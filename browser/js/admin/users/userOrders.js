app.config(function($stateProvider){
    $stateProvider.state('userOrders', {
        url: '/admin/users/orders/:id',
        templateUrl: 'js/admin/users/userOrders.html',
        controller: 'AdminUserOrdersCtrl',
        resolve: {
            userOrders : function(OrderFactory){
                return UserFactory.getAll();
            }
        }
    });
});

app.controller('AdminUserOrdersCtrl', function($scope, userOrders, OrderFactory){
    $scope.userOrders = userOrders;
    $scope.deleteOrder = function(order){
        UserFactory.deleteOrder(order.id)
        .then(function(success){
            console.log('Order Deleted!');
            $scope.userOrders.splice($scope.userOrders.indexOf(order, 1));
        });
    };
});