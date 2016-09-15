app.config(function($stateProvider){
  $stateProvider.state('characterDetail', {
    url: '/characters/:id',
    templateUrl: 'js/character/characterDetail.html',
    resolve: {
      character: function(characterFactory, $stateParams){
        return characterFactory.getById($stateParams.id)
      },
      categories: function(characterFactory, $stateParams){
        return characterFactory.getCatsById($stateParams.id)
      }
    },
    controller: 'CharacterDetailCtrl'
  })
})
