app.directive('backButton', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/back-button/back-button.html',
        link: function (scope, element, attrs) {
            element.bind('click', goBack);

            function goBack() {
                history.back();
                scope.$apply();
            }
        }
    }
});
