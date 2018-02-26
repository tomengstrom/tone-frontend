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
    element.addClass('tone_intro');

    var poem = args.poemElement;
    poem.addClass('tone_intro_poem');

    element.append( poem );

    return;
  };

  // Extend parent prototype
  Intro.prototype = Object.create(_View.prototype);
  $.extend( Intro.prototype, {
    /*
    * Title to use for this view. Overrides parent.
    *
    * @returns {string} string    A title to show when this view is enabled
    */
    _getTitle: function() {
        return 'Intro';
    }
  });
  return Intro;

});
