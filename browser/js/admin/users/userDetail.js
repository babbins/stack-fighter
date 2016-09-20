// KHWA: Doesn't look like this is used -- delete?
app.config(function($stateProvider){
    $stateProvider.state('userDetail', {
        url: '/admin/users/:id',
        templateUrl: 'js/admin/users/manageUsers.html',
        controller: 'AdminUsersCtrl',
        resolve: {
            // KHWA: How are we passing in the id here?
            // KHWA: Is this used?
            user: function(UserFactory){
                // KHWA: Should this not be a specific user?
                return UserFactory.getAll();
            }
        }
    });
});
