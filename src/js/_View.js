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
      this.__element.hide();
    },

    /*
    * Hides the DOM element
    */
    show: function() {
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


  };

  return _View;
});
