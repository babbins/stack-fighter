app.factory('UserFactory', function($http){
    return {
        getAll: function(){
            return $http.get('/api/users/')
            .then(res => res.data);
        },
        deleteUser: function(id){
            return $http.delete('/api/users/' + id)
            .then(res => res.data);
        },
        toggleAdmin: function(user){
            return $http.put('/api/users/' + user.id, {isAdmin: !user.isAdmin})
            .then(res => res.data);
        },
        resetPassword: function(user){
            return $http.put('/api/users/' + user.id, {passwordReset: !user.passwordReset})
            .then(res => res.data);
        }
    };
});
