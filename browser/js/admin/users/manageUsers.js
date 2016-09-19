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

app.controller('AdminManageUsersCtrl', function($scope, users, UserFactory, $state){
    $scope.users = users;
    $scope.deleteUser = function(user){
        UserFactory.deleteUser(user.id)
        .then(function(success){
            console.log('User Deleted!');
            $scope.users.splice($scope.users.indexOf(user, 1));
        });
    };
    $scope.toggleAdmin = function(user){
        console.log("clicked!")
        UserFactory.toggleAdmin(user)
        .then(function(success){
            console.log('User Updated!');
            $state.$reload();
        });
    };
});