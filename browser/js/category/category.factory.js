app.factory('CategoryFactory', function($http){
<<<<<<< HEAD
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
=======

    var CategoryFactory = {};

    CategoryFactory.fetchAll = function(){
        return $http.get('/api/categories')
        .then(function(res){
            return res.data;
        });
    };

    //This function takes the array of given categories and seperates the given values based on their type. Returns an array of Objects with an array of Objects?
    CategoryFactory.separateTypes = function(array){
        var sortedArr = [];
        var arrKey = [];
        for(var i = 0; i < array.length ; i++){
            var key;
            if(arrKey.indexOf(array[i].type)===-1){
                arrKey.push(array[i].type);
                key = arrKey.length-1;
                sortedArr.push([array[i].type]);
            } else {
                key = arrKey.indexOf(array[i].type);
            }
            sortedArr[key].push(array[i]);
        }  
        return sortedArr; 
    };

    return CategoryFactory;

});
>>>>>>> master
