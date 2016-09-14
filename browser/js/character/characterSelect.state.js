app.config(function ($stateProvider){
  $stateProvider.state('characterSelect', {
    url: '/character-select',
    templateUrl: 'js/character/characterSelect.html',
    resolve: {
      characters: function($http){
        return $http.get('/api/characters').then(res => res.data);
      }
    },
    controller: 'CharacterSelectCtrl'
  })
})
