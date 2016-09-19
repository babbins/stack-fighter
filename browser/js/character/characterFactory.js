app.factory('characterFactory', function($http){
  var charObj = {};
  charObj.getAll = function() {
    return $http.get('/api/characters').then(res => res.data);
  }
  charObj.getById = function(id) {
    return $http.get('/api/characters/' + id).then(res => res.data);
  }
  charObj.getCatsById = function(id) {
    return $http.get('/api/characters/categories/' + id).then(res => res.data);
  }
  charObj.getRevsById = function(id) {
    return $http.get('/api/reviews/?character=' + id).then(res => res.data);
  }
  charObj.removeRev = function(id){
    return $http.delete('/api/reviews' + id).then(res => res.data);
  }
  charObj.create = function(data) {
    return $http.post('/api/reviews', data)
  }
  return charObj
})
