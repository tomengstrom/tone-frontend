/*
* ColorPicker for picking colors in the
* color mapping view.
*
*/
define([
  'Debug',
  'jquery'
], function(
  Debug,
  $
) {
  Debug.enableScope('ColorPicker');

  var COLORS = [
    'black', 'violet', 'wheat',
    'orange', 'goldenrod', 'greenyellow',
    'red', 'pink', 'purple',
    'indigo', 'cyan'
  ];

  function ColorPicker(args) {
    var self = this;

    self.__element = $('<div></div>');
    self.__element.addClass('tone_colorpicker');

    self.__activeSwatch;
    $.each( COLORS, function(i, color) {
      var swatch = $('<div></div>');
      swatch.addClass('tone_colorpicker_swatch');
      swatch.css({
        'background-color': color
      });
      swatch.on('click', function() {
        if ( self.__activeSwatch ) {
          self.__activeSwatch.removeClass('tone_colorpicker_swatch--active')
        }
        swatch.addClass('tone_colorpicker_swatch--active');
        self.__colorSelected(color);
        self.__activeSwatch = swatch;
      });
      if(i == 0) {
        $(swatch).trigger('click');
      }
      self.__element.append(swatch);
    } );

    return;
  };

  ColorPicker.COLOR_PICKED_EVENT = 'onmappingcolorpicked';

  ColorPicker.prototype = {

    /*
    * Fires the COLOR_PICKED_EVENT with the specified color
    *
    * @param {string} color     Color string.
    *
    * @return null
    */
    __colorSelected: function(color) {
      $(this).trigger( ColorPicker.COLOR_PICKED_EVENT, [ color ] );
      return;
    },

    /*
    * Getter for the DOM element.
    *
    * @return {DOMElement}    The DOM element of this object.
    */
    getElement: function() {
      return this.__element;
    }

  };

  return ColorPicker;

});
