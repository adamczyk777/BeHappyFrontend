module.exports = service;

function service($q, TokenStorage) {
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
