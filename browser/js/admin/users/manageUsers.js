app.config(function($stateProvider){
    $stateProvider.state('adminUsers', {
        url: '/admin/users',
        templateUrl: 'js/admin/users/manageUsers.html',
        controller: 'AdminManageUsersCtrl',
        resolve: {
            users: function(UserFactory){
                return UserFactory.getAll();
            },
            loggedUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('AdminManageUsersCtrl', function($scope, users, UserFactory, $state, loggedUser){
    $scope.users = users;
    $scope.deleteUser = function(user){
        UserFactory.deleteUser(user.id)
        .then(function(){
            console.log('User Deleted!');
            $scope.users.splice($scope.users.indexOf(user, 1));
        });
    };
    $scope.toggleAdmin = function(user){
        UserFactory.toggleAdmin(user)
        .then(function(){
            console.log('User Updated!');
            $state.reload();
        });
    };
    $scope.resetPassword = function(user){
        UserFactory.resetPassword(user)
        .then(function(){
            console.log('Password reset!');
            $state.reload();
        });
    };


    $scope.loggedUser = loggedUser;

});
