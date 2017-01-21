module.exports = service;

service.$inject = ['$q', 'TokenStorage', '$state'];
/** @ngInject */
function service($q, TokenStorage, $state) {
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
        $state.go('login');
      }
      return $q.reject(error);
    }
  };
}
