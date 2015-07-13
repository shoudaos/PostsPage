var app = angular.module('myApp', ['ui.router','templates', 'Devise']);
app.config(['$stateProvider',
    '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('/home', {
            url:'/home',
            controller: 'HomeCtrl',
            templateUrl: 'home.html',
            resolve: {
                postPromise: ['posts', function(posts){
                    return posts.getAll();
                }]
            }
        })
        .state('posts',{
            url: '/posts/{id}',
            controller: 'PostsCtrl',
            templateUrl: 'posts.html',
            resolve: {
                post: ['$stateParams', 'posts', function($stateParams, posts) {
                    return posts.get($stateParams.id);
                }]
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'auth/login.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'Auth', function($state, Auth) {
                Auth.currentUser().then(function (){
                    $state.go('home');
                })
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'auth/register.html',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'Auth', function($state, Auth) {
                Auth.currentUser().then(function (){
                    $state.go('home');
                })
            }]
        });
    $urlRouterProvider.otherwise('home');
}]);
