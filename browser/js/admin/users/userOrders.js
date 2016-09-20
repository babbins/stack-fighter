app.config(function($stateProvider){
    $stateProvider.state('userOrders', {
        // KHWA: This address is a bit unintuitive
        url: '/admin/users/orders/:id',
        templateUrl: 'js/admin/users/userOrders.html',
        controller: 'AdminUserOrdersCtrl',
        resolve: {
            userOrders: function(OrderFactory, $stateParams){
                // KHWA: Should the admin not just have an orders view and then filter by users?
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
            // KHWA: Growl / Alert? 
            console.log('Order Deleted!');
            // KHWA: console log on master
            console.log($scope.userOrders);
            // KHWA: Maybe repeat this below?
            $scope.userOrders.splice($scope.userOrders.indexOf(order), 1);
        });
    };
    $scope.changeStatus = function(order, selected){
        OrderFactory.modifyOrder(order.id, {status: selected})
        .then(function(){
            // KHWA: Growl / Alert? 
            // KHWA: Why are we only reloading on the second instance?
            console.log('Changed Order!');
            // KHWA: Could use the splice here
            $state.reload();
        });
    };
});
