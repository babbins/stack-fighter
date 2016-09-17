app.factory('UserFactory', function($http){
    return {
        getAll: function(){
            return $http.get('/api/users/')
            .then(res => res.data);
        }
    };
});