/*
* Tone Single Page App (SAP) object. The main container for the whole site.
* Handles switching between states (introduction, mapping, drawing)
* and links events from frontend views to the backend controller and soundplayer.
*
*/
define([
  'jquery',
  'Debug',
  'Controller',
  'SoundPlayer',
  'ColorMapper',
  'Painter',
  'Intro'
], function(
  $,
  Debug,
  Controller,
  SoundPlayer,
  ColorMapper,
  Painter,
  Intro
) {

  Debug.enableScope('Tone');

  /*
  * Tone class
  */
  function Tone(args) {
    var self = this;

    Debug.log('Tone', 'constructed');

    $('.loader').remove();

    // Init point data structure
    self.__mapperData = [];

    // DOM element; where we add graphics on the HTML page
    self.__element = $('.content');
    self.__element.addClass('tone');
    self.__element.show();

    // Controller for transferring data to and from Backend
    self.__controller = new Controller({});

    // Sound player for playing sounds based on user input
    self.__soundPlayer = new SoundPlayer({});

    // Create views

    self.__viewContainer = $('<div></div>');
    self.__viewContainer.addClass('tone_view-container');
    self.__element.append( self.__viewContainer );

    self.__views = [];

    // Intro (poem)
    self.__intro = new Intro({
      tone: self,
      poemElement: $('.poem')
    });
    self.__addView(self.__intro);

    // Color mapper
    self.__colorMapper = new ColorMapper({
      tone: self
    });
    self.__addView( self.__colorMapper );

    // Painter
    self.__painter = new Painter({
      tone: self
    });
    self.__addView( self.__painter );



    // Create view switching controls
    var controlContainer = $('<div></div>');
    controlContainer.addClass('tone_control-container');
    self.__element.append(controlContainer);

    var nextButton = $('<button>Next</button>');
    var prevButton = $('<button>Prev</button>');
    nextButton.addClass('tone_control-container_button');
    prevButton.addClass('tone_control-container_button');

    nextButton.on('click', function() {
      self.__changeView(1);
    });
    prevButton.on('click', function() {
      self.__changeView(-1);
    });

    controlContainer.append(nextButton);
    controlContainer.append(prevButton);

    // Set the current view
    self.__setView(2);

    return;
  };

  Tone.prototype = {

    /*
    * Changes view.
    *
    * @param {integer} direction  Positive or negative number.
    *                             1 goes forward, -1 goes backward.
    *
    * @returns null;
    */
    __changeView: function(direction) {
      var self = this;
      var index = self.__currentIndex + direction;
      if( index < 0 ) index = self.__views.length -1;
      if (index == self.__views.length ) index = 0;
      self.__setView( index );
      return;
    },

    /*
    * Adds a view to the view container.
    *
    * @param {object} view    A view (ColorMapper, Painter or Intro)
    *
    * @returns null
    */
    __addView: function(view) {
      var self = this;
      self.__viewContainer.append( view.getElement() );
      view.hide();
      self.__views.push(view);
      return;
    },

    /*
    * Sets the currently enabled view.
    * @param {integer} index    An integer indicating a populated index in the
    *                           views array.
    * @returns null
    */
    __setView: function(index) {
      var self = this;
      Debug.log('Tone', '__setView ' + index );


      // Retrieve the view from array
      var view = self.__views[index];

      // Tell view that it has been selected
      view.update();

      // Hide current view, if any
      if ( self.__currentView ) {
        self.__currentView.hide();
      }

      // Set new current view and show it
      self.__currentView = view;
      self.__currentView.show();

      // Set current index
      self.__currentIndex = index;


      return;
    },

    /*
    * Getter for SoundPlayer instance.
    * @returns {SoundPlayer}    SoundPlayer instance.
    */
    getSoundPlayer: function() {
      return this.__soundPlayer;
    },

    /*
    * Getter for Controller instance.
    * @returns {Controller}    Controller instance.
    */
    getController: function() {
      return this.__controller;
    },

    /*
    * Maps a color to a point.
    * // TODO how is this mapping normalized ?
    *
    * @param {object} pointData   Object containing the point data:
    *   @param {number} x       The x-coordinate of the point.
    *   @param {number} y       The y-coordinate of the point.
    *   @param {number} xMax    The current maximum x dimension of the canvas.
    *   @param {number} yMax    The current maximum y dimension of the canvas.
    *   @param {string} color   Color value.
    *
    * @returns null
    */
    addPoint: function( pointData ) {
      var self = this;

      Debug.log('Tone', 'addPoint:', pointData );

      // Store data
      self.__mapperData.push(pointData)
      // Play sound for this point
      self.__soundPlayer.playSound(pointData);

      Debug.log('Tone', 'addPoint: mapperData is', self.__mapperData);

      return;
    },

    /* Getter for mapper data
    * @returns {array}      The array containing data added by ColorMapper
    */
    getMapperData: function() {
      return this.__mapperData;
    },

    /*
    * Normalizes a coordinate from a source plane to a target plane
    * @param {object} args            Object containing the variables:
    *   @param {number} x             The x-coordinate of the point.
    *   @param {number} y             The y-coordinate of the point.
    *   @param {number} sourceXMax    The maximum x dimension of the source plane.
    *   @param {number} sourceYMax    The maximum y dimension of the source plane.
    *   @param {number} targetXMax    The maximum x dimension of the target plane.
    *   @param {number} targetYMax    The maximum y dimension of the target plane.
    */
    remapCoordinate: function( args ) {
      return {
        x: args.targetXMax * args.x / args.sourceXMax,
        y: args.targetYMax * args.y / args.sourceYMax
      };
    }

  };

  return Tone;
});
