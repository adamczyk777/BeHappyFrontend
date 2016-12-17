module.exports = service;

function service($window) {
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
      return angular.fromJson($window.atob(base64));
    },
    isAuthenticated: function () {
      return !(localStorage.getItem(storageKey) === null);
    }
  };
}
