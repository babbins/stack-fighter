// KHWA: Should probably add catches throughout to avoid silent errors and display these to the user somehow (growl / alert / etc.)
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
            // KHWA: Maybe this should be an alert / growl instead of a console log
            console.log('User Deleted!');
            $scope.users.splice($scope.users.indexOf(user, 1));
        });
    };
    $scope.toggleAdmin = function(user){
        UserFactory.toggleAdmin(user)
        .then(function(){
            // KHWA: Maybe this should be an alert / growl instead of a console log
            console.log('User Updated!');
            // KHWA: Is this simply to get updated information?
                // Would we not be able to toggleAdmin?
            $state.reload();
        });
    };
    $scope.resetPassword = function(user){
        UserFactory.resetPassword(user)
        .then(function(){
            // KHWA: Maybe this should be an alert / growl instead of a console log
            console.log('Password reset!');
            // KHWA: Should be able to just add / modify the user's password reset and digest should happen automatically
            $state.reload();
        });
    };


    $scope.loggedUser = loggedUser;

});
