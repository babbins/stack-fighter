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
    getAll: function(){
      return $http.get('/api/categories').then(res => res.data);
    }
  }
});
