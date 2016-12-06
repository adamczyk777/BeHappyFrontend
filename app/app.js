/**
 * Created by adamc on 26.11.2016.
 */
var app = angular.module('main', [
    'jcs-autoValidate',
    'ngRoute',
    'ngDialog',
    'n3-line-chart'
]);

app.factory('TokenStorage', ['$window', function ($window) {
    var storageKey = 'auth_token';
    return {
        store: function (token) {
            return localStorage.setItem(storageKey, token);
        },
        retrieve: function () {
            return localStorage.getItem(storageKey);
        },
        clear: function () {
            return localStorage.removeItem(storageKey);
        },
        decode: function (token) {
            if (token === null) {
                return null;
            }
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        },
        isAuthenticated: function() {
            return !(localStorage.getItem(storageKey) === null);
        }
    };
}]);

app.config(function ($httpProvider) {
    /**
     * FYI
     * The custom "X-Requested-With" is a conventional header sent by browser clients,
     * and it used to be the default in Angular but they took it out in 1.3.0.
     * Spring Security responds to it by not sending a "WWW-Authenticate" header in a 401 response,
     * and thus the browser will not pop up an authentication dialog (which is desirable in our app since
     * we want to control the authentication).
     * @type {string}
     */
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});

app.service('urls', function () {
    var domain = "http://localhost:8080/";  //add our local domain
    var api = "api/";                    //add our default endpoint
    this.apiUrl = domain + api;
    // this.applicationId = "57d313d019388513cf91d701";
});

app.factory('TokenAuthInterceptor', function ($q, TokenStorage) {
    return {
        request: function (config) {
            var authToken = TokenStorage.retrieve();
            if (authToken) {
                config.headers['X-AUTH-TOKEN'] = authToken;
            }
            return config;
        },
        responseError: function (error) {
            if (error.status === 401 || error.status === 403) {
                TokenStorage.clear();
            }
            return $q.reject(error);
        }
    }
}).config(['$httpProvider' , function ($httpProvider) {
    $httpProvider.interceptors.push('TokenAuthInterceptor');
}]);

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
