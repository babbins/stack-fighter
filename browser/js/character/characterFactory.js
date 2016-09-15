app.factory('characterFactory', function($http){
  var charObj = {};
  charObj.getAll = function() {
    return $http.get('/api/characters').then(res => res.data);
  }
  charObj.getById = function(id) {
    return $http.get('/api/characters/' + id).then(res => res.data);
  }
  return charObj
})
