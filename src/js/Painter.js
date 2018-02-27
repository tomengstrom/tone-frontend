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

  // Calculates the distance between two points
  Math.getDistance = function(x1,x2,y1,y2) {
    return Math.sqrt( Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2) );
  };

  Math.getRadialPoint = function(x,y,radius,angle) {
    return {
      x: x + radius * Math.cos(angle),
      y: y + radius * Math.sin(angle)
    };
  };

  // Gets outer tangent points of two circles
  Math.getOuterTangents = function(x1,y1,r1, x2,y2,r2) {
    var d = Math.getDistance(x1,x2,y1,y2);
    var sr = r1 / r2;

    var h2 = d / ( 1 + sr );
    var b = Math.acos( r2 / h2 );
    var a = 0;
    //var a = Math.atan2( (y2-y1), (x2-x1) );

    var t1a = a + b;
    var t2a = a - b;

    var c1p1 = Math.getRadialPoint(x1,y1,r1,t1a);
    var c1p2 = Math.getRadialPoint(x1,y1,r1,t2a);

    var c2p1 = Math.getRadialPoint(x2,y2,r2,t1a);
    var c2p2 = Math.getRadialPoint(x2,y2,r2,t2a);

    return {
      c1p1: c1p1,
      c1p2: c1p2,
      c2p1: c2p1,
      c2p2: c2p2
    }
  }

  var MAX_RADIUS = 25;
  var BASE_RADIUS = 10;

  function Painter(args) {
    var self = this;

    // Call parent constructor
    _View.call(this, args);

    Debug.log('Painter', 'constructed');

    // Initialize mapper data var
    self.__mapperData = null;

    // Init variable for storing previous position
    self.__previousPoint = null;

    // Init canvas and context
    self.__canvas = $("<canvas>Sorry, your browser doesn't support canvas.</canvas>");
    self.getElement().append(self.__canvas);
    self.getElement().addClass('tone_painter');

    self.__context = self.__canvas.get(0).getContext('2d');

    self.__radius = BASE_RADIUS;
    self.__isDragging = false;

    self.__context.lineWidth = self.__radius * 2;

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

    // Fire resize event
    $(window).triggerHandler('resize');

    var drawCircle = function(cx,cy,r) {
      self.__context.beginPath();
      self.__context.arc( cx, cy, r, 0, Math.PI*2);
      self.__context.stroke();
      self.__context.closePath();
    };

    var drawLine = function(x1,y1,x2,y2) {
      self.__context.beginPath();
      self.__context.moveTo( x1,y1 );
      self.__context.lineTo( x2, y2 );
      self.__context.stroke();
      self.__context.closePath();
    }

    // Circle test
    var x1 = 300, y1=300, r1 = 50;
    var x2 = 150, y2=300, r2 = 25;

    var c = Math.getOuterTangents( x1,y1,r1, x2,y2,r2 );
    Debug.log('Painter', 'c is', c);

    // Circles
    drawCircle(x1,y1,r1);
    drawCircle(x2,y2,r2);

    // Tangents
    //drawLine( c.c1p1.x, c.c1p1.y, c.c2p1.x, c.c2p1.y );
    drawCircle(c.c1p1.x, c.c1p1.y, 4);
    drawCircle(c.c1p2.x, c.c1p2.y, 4);
    drawCircle(c.c2p1.x, c.c2p1.y, 4);
    drawCircle(c.c2p2.x, c.c2p2.y, 4);

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
      self.__previousPoint = null;
      return;
    },

    __getXMax: function() {
      return this.__canvas.get(0).width;
    },
    __getYMax: function() {
      return this.__canvas.get(0).height;
    },

    /*
    * Get the fill color to use
    */
    __getFillColor: function(x, y) {
      var self = this;

      if (!self.__mapperData.length) {
        return 'black';
      }

      // Find the closest normalized mapped data point and use the color
      // corresponding to that
      var closest;
      for (var i=0; i < self.__mapperData.length; i++) {
        var dataPoint = self.__mapperData[i];

        // Remap mapped coordinate to our canvas
        var remappedPoint = self.__tone.remapCoordinate({
          x: dataPoint.x,
          y: dataPoint.y,
          sourceXMax: dataPoint.xMax,
          sourceYMax: dataPoint.yMax,
          targetXMax: self.__getXMax(),
          targetYMax: self.__getYMax()
        });

        Debug.log( 'Painter', 'got remapped coordinate', remappedPoint );

        // Calculate distance of current point to remapped data point
        var distance = Math.getDistance( remappedPoint.x, x, remappedPoint.y, y );

        Debug.log('Painter', 'distance to ' + i + ' is ' + distance);

        // First point, simply store the value and continue to next
        if (!closest) {
          closest = {
            data: dataPoint,
            remappedPoint: remappedPoint,
            distance: distance
          };
          continue;
        }
        if ( closest.distance > distance ) {
          // This point is closer, use that
          closest = {
            data: dataPoint,
            remappedPoint: remappedPoint,
            distance: distance
          };
        }
      }
      return closest.data.color;
    },

    /* Gets the distance of passed point to the previous point
    *
    * @param {number} x   X-coordinate
    * @param {number} y   Y-coordinate
    *
    * @returns {double}   Distance to previous point
    */
    __getDistanceToPrevious: function(x,y) {
      if( !this.__previousPoint ) return 0;
      return Math.getDistance(x, this.__previousPoint.x, y, this.__previousPoint.y );
    },

    __updateColor: function(x,y) {
      var self = this;
      self.__setColor( self.__getFillColor(x,y) );
      return;
    },

    __setColor: function(color) {
      var self = this;
      self.__color = color;
      self.__context.fillStyle = self.__color;
      self.__context.strokeStyle = self.__color;
      return;
    },

    __updateRadius: function(distance) {
      this.__radius = BASE_RADIUS * 0.1 * distance;
      if (this.__radius > MAX_RADIUS ) this.__radius = MAX_RADIUS;
    },

    /*
    * Draw a point based on mapped data
    * @returns null
    */
    __drawPoint: function(e) {
      var self = this;

      if (self.__isDragging) {

        // FIXME these should be relative points on the canvas, not client
        // (they won't be the same if we have scrolled or something like that)
        var x = e.clientX;
        var y = e.clientY;

        // Get distance to previous
        var distance = self.__getDistanceToPrevious(x,y);

        // Update radius
        var previousRadius = self.__radius;
        self.__updateRadius( distance );

        // Update color
        self.__updateColor( x, y );

        // Draw new circle
        self.__context.beginPath();
        self.__context.arc( x, y, self.__radius, 0, Math.PI*2);
        self.__context.stroke();
        //self.__context.fill();
        self.__context.beginPath();
        self.__context.moveTo( x, y);

        // Draw a rectangle from old circle to new circle
        if (self.__previousPoint ) {
          var tps = Math.getOuterTangents(
            self.__previousPoint.x, self.__previousPoint.y, previousRadius,
            x, y, self.__radius
          );
          self.__context.beginPath();
          self.__context.moveTo( tps.c1p1.x, tps.c1p1.y );
          self.__context.lineTo( tps.c2p1.x, tps.c2p1.y );
          self.__context.lineTo( tps.c2p2.x, tps.c2p2.y );
          self.__context.lineTo( tps.c1p2.x, tps.c1p2.y );
          self.__context.fillStyle = 'red';
          self.__context.fill();
          self.__context.closePath();

        }

        self.__previousPoint = {
          x: x,
          y: y
        };
      }
      return;
    },

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
        return 'Painter';
    },

    /* Updates the painting area based on current ColorMapper data.
    * @returns null
    */
    update: function() {
      var self = this;
      self.__mapperData = self.__tone.getMapperData();
      return;
    },


  });
  return Painter;

});
