app.factory('AdminFactory', function($http){
  return {
    getCharacters: function(){
      return $http.get('/api/characters/categories').then(res => res.data)
    }
  }
})
