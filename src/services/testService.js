module.exports = service;

/** @ngInject */
function service($resource, api) {
  return $resource(api.endpoint + '/therapies/:id/:action', {}, {

  });
}
