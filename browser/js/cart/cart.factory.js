app.factory('CartFactory', function($http) {
    var CartFactory = {};

    CartFactory.getCart = function(){
        return $http.get('/api/cart')
        .then(function(response){
            return response.data;
        })
    };

    CartFactory.addToCart = function(character, quantity) {};

    return CartFactory;
})
