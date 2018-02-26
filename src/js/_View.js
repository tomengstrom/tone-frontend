/*
* Abstract class for _Views. Contains general
* methods for hiding / showing views
*
*/
define([
  'Debug',
  'jquery'
], function(
  Debug,
  $
) {

  // Enable _View scope
  Debug.enableScope('_View');

  function _View(args) {
    var self = this;

    // Reference to parent Tone object
    self.__tone = args.tone;

    // Create DOM element
    self.__element = $("<div></div>");
    self.__element.addClass('tone_view');

    var title = $('<h2></h2>');
    title.addClass('tone_view_title');
    title.html( self._getTitle() );
    self.__element.append(title);

    // Resize event listener
    $(window).on('resize', function() {
      self._resize();
    });
    $(window).triggerHandler('resize');


    return;
  };
  _View.prototype = {

    /*
    * Getter for the Tone object.
    *
    * @returns {object} Tone  The parent Tone object.
    */
    _getTone: function() {
      return this.__tone;
    },

    /*
    * Hides the DOM element
    */
    hide: function() {
      // FIXME disable event listeners
      this.__element.hide();
    },

    /*
    * Hides the DOM element
    */
    show: function() {
      // FIXME enable event listeners
      this.__element.show();
    },

    /*
    * Getter for the DOM element.
    *
    * @return {DOMElement}  The DOM element of this object.
    */
    getElement: function() {
      return this.__element;
    },

    /*
    * Title to use for this view
    *
    * @returns {string} string    A title to show when this view is enabled
    */
    _getTitle: function() {
        return 'ColorMapper';
    },


    /*
    * Stub callback for resize event
    * @param {object} e   Event object.
    * @returns null;
    */
    _resize: function(e) {},

  };

  return _View;
});
