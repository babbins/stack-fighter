app.config(function($stateProvider){
    $stateProvider.state('adminCategories', {
        url: '/admin/categories',
        templateUrl: 'js/admin/categories/categories.html',
        controller: 'AdminCategoriesCtrl',
        resolve: {
            categories: function(CategoryFactory){
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
      console.log(category);
      CategoryFactory.create(category).then(() => $state.go('adminCategories', {}, {reload: true}));
    }
    $scope.deleteCategory = function(id){
      console.log(id);
      CategoryFactory.remove(id).then(() => $state.go($state.current, {}, {reload: true}));
    }
})
