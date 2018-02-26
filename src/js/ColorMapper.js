/*
* View that contains UI for user input of data points that map
* color and 2D points to sound data.
*
*/
define([
  'Debug',
  'jquery',
  '_View',
  'ColorPicker'
], function(
  Debug,
  $,
  _View,
  ColorPicker
) {

  Debug.enableScope('ColorMapper');

  // Radius for dropped points
  var CIRCLE_RADIUS = 10;

  var DEFAULT_COLOR = 'cyan';

  function ColorMapper(args) {
    var self = this;

    // Call parent class constructor
    _View.call(this, args);

    Debug.log('ColorMapper', 'constructed');

    var element = self.getElement();
    element.addClass('tone_mapper');

    // Initialize DOM
    // Canvas
    self.__canvas = $("<canvas>Sorry, your browser doesn't support canvas.</canvas>");
    element.append(self.__canvas);
    self.__context = self.__canvas.get(0).getContext('2d');

    // Color picker
    self.__color = DEFAULT_COLOR;
    self.__colorPicker = new ColorPicker();
    $(self.__colorPicker).on( ColorPicker.COLOR_PICKED_EVENT, function(e) {
      self.__setColor( self.__colorPicker.getColor() );
    });
    // Fire color picked event to get initial color
    self.__setColor( self.__colorPicker.getColor() );
    element.append( self.__colorPicker.getElement() );

    // Canvas event listeners
    $(self.__canvas).on('click', function(e) {
      self.__addPoint(e.clientX, e.clientY);
    });

    // Fire resize event
    $(window).triggerHandler('resize');

    return;
  };

  // Extend parent prototype
  ColorMapper.prototype = Object.create(_View.prototype);
  $.extend( ColorMapper.prototype, {

    /*
    * Set the current color
    *
    * @param {string} color   String representation of a color
    *
    * @returns null
    */
    __setColor: function(color) {
      var self = this;
      Debug.log('ColorMapper', '__setColor: ' + color );
      self.__color = color;
      self.__context.fillStyle = self.__color;
      return;
    },

    /*
    * Draws a circle centered in the specified coordinates.
    *
    * @param {number} x     The x-coordinate of the center of the circle.
    * @param {number} y     The y-coordinate of the center of the circle.
    *
    * @returns null
    */
    __drawCircle: function(x, y) {
      var self = this;
      self.__context.beginPath();
      self.__context.arc(x, y, CIRCLE_RADIUS, 0, Math.PI * 2 );
      self.__context.fill();
      return;
    },

    /*
    * Adds a point in the specified coordinates.
    *
    * @param {number} x     The x-coordinate of the point.
    * @param {number} y     The y-coordinate of the point.
    *
    * @returns null
    */
    __addPoint: function(x,y) {
      var self = this;

      // Add point to data structure
      self.__tone.addPoint( {
        x: x,
        y: y,
        xMax: self.__canvas.width(),
        yMax: self.__canvas.height(),
        color: self.__color
      } );

      // Draw point on canvas
      self.__drawCircle(x,y);

      return;
    },

    /*
    * Resize event handler. Makes sure the canvas fills the window after
    * it has been resized. Overrides parent.
    *
    * @return null
    */
    _resize: function() {
      var self = this;

      if(!self.__canvas) return;

      // FIXME don't lose the current canvas contents on resize
      self.__canvas.get(0).width = window.innerWidth;
      self.__canvas.get(0).height = window.innerHeight;

      self.__context.fillStyle = self.__color;

      return;
    },


    /*
    * Title to use for this view. Overrides parent.
    *
    * @returns {string} string    A title to show when this view is enabled
    */
    _getTitle: function() {
        return 'ColorMapper';
    }
  } );

  return ColorMapper;

});
