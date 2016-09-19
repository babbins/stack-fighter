app.factory('UserFactory', function($http){
    return {
        getAll: function(){
            return $http.get('/api/users/')
            .then(res => res.data);
        },
        deleteUser: function(id){
            return $http.delete('/api/users/'+id)
            .then(res => res.data);
        }
    };
});