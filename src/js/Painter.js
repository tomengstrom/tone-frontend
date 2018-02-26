/*
* View for painting based on the mapping.
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

  Debug.enableScope('Painter');

  function Painter(args) {
    var self = this;

    // Call parent constructor
    _View.call(this, args);

    Debug.log('Painter', 'constructed');

    // Init canvas and context
    self.__canvas = $("<canvas>Sorry, your browser doesn't support canvas.</canvas>");
    self.getElement().append(self.__canvas);

    self.__context = self.__canvas.get(0).getContext('2d');

    self.__radius = 10;
    self.__isDragging = false;

    self.__context.lineWidth = self.__radius * 2;

    // Resize event listener
    $(window).on('resize', function() {
      self.__resize();
    });
    $(window).triggerHandler('resize');

    // Canvas event listeners
    $(self.__canvas).on('mousedown', function(e) {
      self.__startDraw(e);
    });
    $(self.__canvas).on('mouseup', function(e) {
      self.__endDraw(e);
    });
    $(self.__canvas).on('mousemove', function(e) {
      self.__drawPoint(e);
    });

    return;
  };

  // Extend parent prototype
  Painter.prototype = Object.create(_View.prototype);
  $.extend( Painter.prototype, {
    __startDraw: function(e) {
      var self = this;
      self.__isDragging = true;
      self.__context.beginPath();
      self.__drawPoint(e);
      return;
    },

    __endDraw: function(e) {
      var self = this;
      self.__isDragging = false;
      return;
    },

    __drawPoint: function(e) {
      var self = this;

      if (self.__isDragging) {
        self.__context.lineTo(e.clientX, e.clientY);
        self.__context.stroke();
        self.__context.beginPath();
        self.__context.arc(e.clientX, e.clientY, self.__radius, 0, Math.PI*2);
        self.__context.fill();
        self.__context.beginPath();
        self.__context.moveTo(e.clientX, e.clientY);
      }
      return;
    },

    __resize: function() {
      var self = this;
      // FIXME implement
      return;
    }

  });
  return Painter;

});
