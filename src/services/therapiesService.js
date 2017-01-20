module.exports = service;

/** @ngInject */
function service($resource, api) {
  return $resource(api.endpoint + '/therapies/:id/:action', {}, {
    add: {
      method: 'POST',
      isArray: false
    },
    getAll: {
      method: 'GET',
      isArray: true
    },
    getMood: {
      method: 'GET',
      params: {
        id: '@id',
        action: 'mood'
      }
    }
  });
}
