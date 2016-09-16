app.factory('CartFactory', function($http) {
    var CartFactory = {};

    CartFactory.getCart = function(){
        return $http.get('/api/cart')
        .then(cart => {
            // console.log("CART FROM FACTORY: ", cart);
            return cart.data
        });
    }

    CartFactory.addToCart = function(character, quantity) {
        return $http.post('/api/cart', {
            character: character.id
        })
    };


    //GET TOTAL OF CART
    CartFactory.cartTotal = function(cartCharacters) {
        var total = 0;
        cartCharacters.forEach(function(character){
            // console.log(character.price);
            total+= Number(character.price);
        })
        return total;
    };

    return CartFactory;
});
