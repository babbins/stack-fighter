// KHWA: Should add .catch() at the end of all your promise chains
app.config(function($stateProvider){
    $stateProvider.state('adminCategories', {
        url: '/admin/categories',
        templateUrl: 'js/admin/categories/categories.html',
        controller: 'AdminCategoriesCtrl',
        resolve: {
            categories: function(CategoryFactory){
                // KHWA: What is .separate doing?
                // KHWA: Should this be a class method?
                return CategoryFactory.getAll().then(categories => CategoryFactory.separate(categories));
            }
        }
    });
    $stateProvider.state('adminCategories.add', {
        url: '/add',
        templateUrl: 'js/admin/categories/addCategory.html',
    });
});

app.controller('AdminCategoriesCtrl', function($scope, $state, categories, CategoryFactory){
    $scope.categories = categories;
    $scope.addCategory = function(category){
    // KHWA: We should delete these logs in master
      console.log(category);
      // KHWA: We should use $state.reload OR update the categories that we need
      // KHWA: Alternatively, you could directly manipulate $scope.data in your .then
      CategoryFactory.create(category).then(() => $state.go('adminCategories', {}, {reload: true}));
    }
    $scope.deleteCategory = function(id){
    // KHWA: We should delete these logs in master
      console.log(id);
      // KHWA: We should use $state.reload OR update the categories that we need
      // KHWA: Use $scope.$evalAsync()? (Might not be the right camelCase)
      CategoryFactory.remove(id).then(() => $state.go($state.current, {}, {reload: true}));
    }
})
