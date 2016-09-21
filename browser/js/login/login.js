app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

    $stateProvider.state('resetPassword', {
      url: '/resetPassword/:id',
      templateUrl: 'js/login/resetPassword.html',
      controller: 'ResetCtrl',
      resolve: {
        id: function($stateParams){
          return $stateParams.id;
        }
      }
    })

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;
        AuthService.login(loginInfo).then(function (userOrId) {
          console.log(userOrId);
          if (typeof userOrId === 'object'){
            $state.go('characterSelect');
          }
          else {
            $state.go('resetPassword', {id: userOrId});
          }
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});

app.controller('ResetCtrl', function($scope, $state, id, UserFactory, $log){
  console.log(id);
  $scope.resetPassword = function(password){
    UserFactory.update(id, {password: password, passwordReset: false})
    .then(function(){
      console.log('Password successfully updated!');
      $state.go('login');
    })
    .catch($log);
  }

})
