// KHWA: No need for this controller
// KHWA: Is this the parent of characters / categories / users?
  // You can use nested states here, so that data can persist across 'tabs'
app.config(function($stateProvider){
  $stateProvider.state('adminHome', {
    url: '/admin',
    templateUrl: 'js/admin/home/home.html',
    controller: 'AdminHomeCtrl'

  });
});

app.controller('AdminHomeCtrl', function($scope){

});