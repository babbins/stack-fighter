app.directive('cartSidebar', function(CartFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/cart/cart.html',
        link: function(scope, element, attribute){
            // CartFactory.getCart()
            // .then(function(response){
            //     // var numOfCharsInCart = response.characters.length
            //     // if(numOfCharsInCart < 5){
            //     //     var extraAdded = 5 - numOfCharsInCart;
            //     // }
            //     // for (var i = 0; i < extraAdded; i++) {
            //     //     response.characters[numOfCharsInCart + i] = {
            //     //         name: "Placeholder Cart Item",
            //     //         id: numOfCharsInCart + i + 1
            //     //     };
            //     // }
            //     scope.currentCart = response
            //     scope.total = CartFactory.cartTotal(scope.currentCart.characters)
                // console.log(scope.total);
            // })
        }
    }
})
