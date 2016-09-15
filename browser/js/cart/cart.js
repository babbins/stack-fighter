app.directive('cartSidebar', function(CartFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/cart/cart.html',
        link: function(scope, element, attribute){
            CartFactory.getCart()
            .then(function(response){           //what is length of res??
                scope.cartItems = response      //fill cart items to 5 always
            })


        }

    }
})
