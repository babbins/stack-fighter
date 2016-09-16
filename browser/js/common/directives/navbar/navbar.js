app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Character Select', state: 'characterSelect' },
                { label: 'My Squad', state: 'mySquad'},
                { label: 'About', state: 'about' },
                { label: 'My Orders', state: 'myOrders', auth: true }
                
            ];
            scope.admin = {label: 'Admin', state: 'adminHome', auth: true};
            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function(){
              return AuthService.isAdmin();
            }

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    console.log(user);
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };


            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
