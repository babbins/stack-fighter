app.factory('CartFactory', function($http) {
    var CartFactory = {};

    CartFactory.getCart = function(){
        return $http.get('/api/cart')
        .then(cart => {
            // console.log("CART FROM FACTORY: ", cart);
            return cart.data
        });
    }

    CartFactory.addToCart = function(character, quantity) {};

    return CartFactory;
});
