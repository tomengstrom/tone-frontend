/*
* View for the introduction.
* // TODO finish
*/
define([
  'Debug',
  'jquery',
  '_View'
], function(
  Debug,
  $,
  _View
) {

  Debug.enableScope('Intro');

  function Intro(args) {
    var self = this;

    // Call parent constructor
    _View.call(this, args);

    Debug.log('Intro', 'constructed');

    // Init canvas and context
    var element = self.getElement();
    return;
  };

  // Extend parent prototype
  Intro.prototype = Object.create(_View.prototype);
  $.extend( Intro.prototype, {

  });
  return Intro;

});
