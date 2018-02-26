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


    var colors = [];

    // Predefined color palette
    //colors = COLORS;

    // Create random colors
    var getRandomColor = function() {
      return Math.floor( Math.random() * 255 );
    }
    var randomColors = [];
    for ( var i = 0; i < 12; i++ ) {
      var red = getRandomColor();
      var green = getRandomColor();
      var blue = getRandomColor();
      randomColors.push( 'rgb(' + red +','+green+','+blue+')');
    }
    colors = randomColors;
    Debug.log('ColorPicker', 'colors are', colors );

    self.__activeSwatch;
    self.__currentColor;
    $.each( colors, function(i, color) {
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
        self.__currentColor = color;
        Debug.log('ColorPicker', 'swatch clicked, color is ' + self.__currentColor );

        $(self).trigger( ColorPicker.COLOR_PICKED_EVENT, [] );

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

    /* Getter for current color
    * @returns {string} current color string
    */
    getColor: function() {
      return this.__currentColor;
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
