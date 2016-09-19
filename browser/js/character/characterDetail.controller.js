app.controller('CharacterDetailCtrl', function($scope, character, categories, reviews, characterFactory, $stateParams){
  $scope.character = character;
  var separateTypes = function(array){
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
   };
   $scope.categories = []
   var sortedCategories = separateTypes(categories)
   for (var index = 0; index < sortedCategories.length; index++) {
     var category = {}
     category.title = sortedCategories[index][0]
     category.values = []
     for (var i = 1; i < sortedCategories[index].length; i++) {
       category.values.push(sortedCategories[index][i].value)
     }
     $scope.categories.push(category)
   }
   reviews.forEach(function(review){
       if (!review.userId) review.user = {first_name: 'Anon'}
   })
   $scope.reviews = reviews
   $scope.error = ''
   $scope.createReview = function() {
       $scope.newReview.characterId = character.id
       characterFactory.create($scope.newReview)
       .then(() => characterFactory.getRevsById($stateParams.id))
       .then(function(foundReviews){
           $scope.reviews = foundReviews
       })
       .catch(function(err){
           $scope.error = err
       })
   }
})
