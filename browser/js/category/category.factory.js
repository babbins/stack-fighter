app.factory('CategoryFactory', function($http){
  return {
    separate: function(array){
       var sortedArr = [];
       var arrKey = [];
       for (var i = 0; i < array.length ; i++){
           var key;
           if (arrKey.indexOf(array[i].type) === -1){
               arrKey.push(array[i].type);
               key = arrKey.length - 1;
               sortedArr.push([array[i].type]);
           } else {
               key = arrKey.indexOf(array[i].type);
           }
           sortedArr[key].push(array[i]);
       }
       return sortedArr;
    },
    organize: function(array){
      array = this.separate(array);
      var categories = [];
      for (var index = 0; index < array.length; index++) {
        var category = {}
        category.title = array[index][0]
        category.values = []
        for (var i = 1; i < array[index].length; i++) {
          category.values.push(array[index][i].value)
        }
        categories.push(category);
      }
      return categories;
    },
    getAll: function(){
      return $http.get('/api/categories').then(res => res.data);
    },
    create: function(category){
      return $http.post('/api/categories', category).then(res => res.data);
    },
    remove: function(id){
      return $http.delete('/api/categories/' + id).then(res => res.data);
    }
  }
});
