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
    },
    getMembers: {
      method: 'GET',
      isArray: true,
      params: {
        id: '@id',
        action: 'members'
      }
    },
    addMember: {
      method: 'POST',
      isArray: false,
      params: {
        id: '@id',
        action: 'members'
      }
    },
    changeTherapyName: {
      method: 'POST',
      isArray: false,
      params: {
        id: '@id'
      }
    },
    deleteTherapy: {
      method: 'DELETE',
      isArray: false,
      params: {
        id: '@id',
        action: 'remove'
      }
    }
  });
}
