'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
var myApp = angular
    .module('studentManagement', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'datepicker'
    ]);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/loginPage.html',
            controller: 'loginPageCtrl'
        })
        .when('/createNewUser', {
            templateUrl: 'views/signUpPage.html',
            controller: 'loginPageCtrl'
        })
        .when('/userPage', {
            templateUrl: 'views/userPage.html',
            controller: 'loginPageCtrl'
        }).otherwise({redirectTo: '/'});

});

myApp.run(["$rootScope", "$log", "$location", function ($rootScope, $log, $location) {
    $rootScope.$on('$routeChangeStart', function (next, current) {

        $log.log("Route changed.", "$routeParams : ", $location.url());

        if ($location.url() == "/" && $rootScope.showUserName == true) {
            $location.path("/userPage");
        }

        if ($location.url() == "/userPage" && $rootScope.showUserName == false) {
            $location.path("/");
        }
        

    });
}]);
