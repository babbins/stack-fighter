app.config(function($stateProvider){
    $stateProvider.state('userOrders', {
        url: '/admin/users/orders/:id',
        templateUrl: 'js/admin/users/userOrders.html',
        controller: 'AdminUserOrdersCtrl',
        resolve: {
            userOrders: function(OrderFactory, $stateParams){
                return OrderFactory.getOneUserOrders($stateParams.id);
            }
        }
    });
});

app.controller('AdminUserOrdersCtrl', function($scope, $state, userOrders, OrderFactory){
    $scope.userOrders = userOrders;
    $scope.deleteOrder = function(order){
        OrderFactory.deleteOrder(order.id)
        .then(function(){
            console.log('Order Deleted!');
            console.log($scope.userOrders);
            $scope.userOrders.splice($scope.userOrders.indexOf(order), 1);
        });
    };
    $scope.changeStatus = function(order, selected){
        OrderFactory.modifyOrder(order.id, {status: selected})
        .then(function(){
            console.log('Changed Order!');
            $state.reload();
        });
    };
});
