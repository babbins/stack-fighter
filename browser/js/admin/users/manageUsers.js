app.config(function($stateProvider){
    $stateProvider.state('adminUsers', {
        url: '/admin/users',
        templateUrl: 'js/admin/users/manageUsers.html',
        controller: 'AdminManageUsersCtrl',
        resolve: {
            users : function(UserFactory){
                return UserFactory.getAll();
            }
        }
    });
});

app.controller('AdminManageUsersCtrl', function($scope, users){
    $scope.users = users;
})