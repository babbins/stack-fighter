app.config(function ($stateProvider){
  $stateProvider.state('characterSelect', {
    url: '/character-select',
    controller: 'CharacterSelectCtrl',
    templateUrl: 'js/character/characterSelect.html',
    resolve: {
      characters: function(characterFactory){
        return characterFactory.getAll();
      },
      categories: function(CategoryFactory){
        return CategoryFactory.fetchAll();
      }
    }
  });
});
