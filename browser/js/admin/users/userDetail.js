app.config(function($stateProvider){
    $stateProvider.state('userDetail', {
        url: '/admin/users/:id',
        templateUrl: 'js/admin/users/manageUsers.html',
        controller: 'AdminUsersCtrl',
        resolve: {
            user: function(UserFactory){
                return UserFactory.getAll();
            }
        }
    });
});
