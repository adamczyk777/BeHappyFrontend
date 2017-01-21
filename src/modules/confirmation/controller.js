module.exports = controller;
/** @ngInject */
function controller($log, $state, $timeout) {
  $log.info('confirmed');
  $timeout(function () {
    $state.go('app.home');
  }, 5000);
}
