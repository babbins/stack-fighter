app.config(function($stateProvider){
  $stateProvider.state('characterDetail', {
    url: '/characters/:id',
    templateUrl: 'js/character/characterDetail.html',
    resolve: {
      character: function($http, $stateParams){
        return $http.get('/api/characters/' + $stateParams.id).then(res => res.data)
      }
    },
    controller: 'CharacterDetailCtrl'
  })
})
