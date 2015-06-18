// We will pass these to the wrapper function at the end of the file
(function(isNode, isAngular) {
    
// This wrapper function returns the contents of your module, 
// with dependencies
var SilverBulletModule = function(Bullet, Silver) {
  var SilverBullet = function() {
    // something awesome happens here
  };
  return SilverBullet;    
};
    
if (isAngular) {
  // AngularJS module definition
  angular.module('app.silverbullet', ['app.silver', 'app.bullet']).
    factory('SilverBullet', ['Bullet', 'Silver', SilverBulletModule]);
} else if (isNode) {
  // NodeJS module definition
  module.exports = SilverBulletModule(
    //require('bullet.js'), 
    //require('silver.js')
  );
}

})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined'); 