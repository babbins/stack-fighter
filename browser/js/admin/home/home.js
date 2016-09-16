app.config(function($stateProvider){
  $stateProvider.state('adminHome', {
    url: '/admin',
    templateUrl: 'js/admin/home/home.html',
    controller: 'AdminHomeCtrl'

  })
})

app.controller('AdminHomeCtrl', function($scope){
});
