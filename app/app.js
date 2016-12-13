angular.module('main', [
    'jcs-autoValidate',
    'ngMaterial',
    'ngMessages'
    ])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }])
    .factory('TokenStorage', TokenStorage)
    .factory('TokenAuthInterceptor', TokenAuthInterceptor)
    .config('$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('TokenAuthInterceptor');
    });



TokenStorage.$inject = ['$window'];
function TokenStorage($window) {
    var storageKey = "auth_token";
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
}

TokenAuthInterceptor.$inject = ['$q', 'TokenStorage'];
function TokenAuthInterceptor($q, TokenStorage) {
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
    };
}