app.config(function($stateProvider){
  $stateProvider.state('checkout', {
    templateUrl: 'js/checkout/checkout.html',
    controller: 'CheckoutCtrl',
    url: '/checkout'
  })
})
