module.exports = controller;

function controller(TokenStorage, $state) {
  if(TokenStorage.retrieve() === null){
    $state.go('app.login');
  }
  // var vm = this;
}
// TODO: Cale staty sa do napisania, ale Maciek albo Szymek muszą mi powiedzieć jak dodać chart.js, bo nie potrafie tymi narzedziami ~ Krzysiek
