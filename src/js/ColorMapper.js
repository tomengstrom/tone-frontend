/*
* View that contains UI for user input of data points that map
* color and 2D points to sound data.
*
*/
define([
  'Debug',
  'jquery',
  'ColorPicker'
], function(
  Debug,
  $,
  ColorPicker
) {

  Debug.enableScope('ColorMapper');

  // Radius for dropped points
  var CIRCLE_RADIUS = 10;

  var DEFAULT_COLOR = 'cyan';

  function ColorMapper(args) {
    var self = this;

    Debug.log('ColorMapper', 'constructed');

    // Reference to parent Tone object
    self.__tone = args.tone;

    // Initialize DOM
    // Main element
    self.__element = $("<div></div>");
    self.__element.addClass('tone_mapping');

    // Canvas
    self.__canvas = $("<canvas>Sorry, your browser doesn't support canvas.</canvas>");
    self.__element.append(self.__canvas);
    self.__context = self.__canvas.get(0).getContext('2d');

    // Color picker
    self.__color = DEFAULT_COLOR;
    self.__colorPicker = new ColorPicker();
    $(self.__colorPicker).on( ColorPicker.COLOR_PICKED_EVENT, function(e, color) {
      Debug.log('ColorMapper', ColorPicker.COLOR_PICKED_EVENT + ' fired', color );
      self.__color = color;

      self.__context.fillStyle = self.__color;
    });
    self.__element.append( self.__colorPicker.getElement() );

    // Resize event listener
    $(window).on('resize', function() {
      self.__resize();
    });
    $(window).triggerHandler('resize');

    // Canvas event listeners
    $(self.__canvas).on('click', function(e) {
      self.__addPoint(e.clientX, e.clientY);
    });

    return;
  };

  ColorMapper.prototype = {

    /*
    * Getter for the DOM element.
    *
    * @return {DOMElement}  The DOM element of this object.
    */
    getElement: function() {
      return this.__element;
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
      self.__tone.addPoint( x, y, self.__color );

      // Draw point on canvas
      self.__drawCircle(x,y);

      return;
    },

    /*
    * Resize event handler. Makes sure the canvas fills the window after
    * it has been resized.
    *
    * @return null
    */
    __resize: function() {
      var self = this;

      // FIXME don't lose the current canvas contents on resize
      self.__canvas.get(0).width = window.innerWidth;
      self.__canvas.get(0).height = window.innerHeight;

      self.__context.fillStyle = self.__color;

      return;
    }

  };

  return ColorMapper;

});
