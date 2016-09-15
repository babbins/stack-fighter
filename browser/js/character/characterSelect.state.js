app.config(function ($stateProvider){
  $stateProvider.state('characterSelect', {
    url: '/character-select',
    templateUrl: 'js/character/characterSelect.html',
    resolve: {
      characters: function(characterFactory){
        return characterFactory.getAll()
      }
    },
    controller: 'CharacterSelectCtrl'
  })
})
