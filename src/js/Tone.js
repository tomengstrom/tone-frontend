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

    // DOM element; where we add graphics on the HTML page
    self.__element = $('.content');

    // Controller for transferring data to and from Backend
    self.__controller = new Controller({});

    // Sound player for playing sounds based on user input
    self.__soundPlayer = new SoundPlayer({});

    // Create views

    self.__viewContainer = $('<div></div>');
    self.__viewContainer.addClass('tone_view-container');
    self.__element.append( self.__viewContainer );

    // Intro (poem)
    self.__intro = new Intro({
      tone: self
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

    controlContainer.append(nextButton);
    controlContainer.append(prevButton);

    // Set the current view
    self.__setView( self.__colorMapper );

    return;
  };

  Tone.prototype = {

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
      return;
    },

    /*
    * Sets the currently enabled view.
    * @param {object} view    A view (ColorMapper, Painter or Intro).
    * @returns null
    */
    __setView: function(view) {
      var self = this;

      if ( self.__currentView ) {
        self.__currentView.hide();
      }

      self.__currentView = view;
      self.__currentView.show();

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
    * Maps a color to a point.
    * // TODO how is this mapping normalized ?
    *
    * @param {number} x       The x-coordinate of the point.
    * @param {number} y       The y-coordinate of the point.
    * @param {string} color   Color value.
    *
    * @returns null
    */
    addPoint: function( x, y, color ) {
      var self = this;
      Debug.log('Tone', 'addPoint called', {
        x: x, y: y, color: color
      });

      // Play sound representing
      // this point/sound combination
      var soundArgs = {};
      self.__soundPlayer.playSound({
        x: x, y:y, color: color
      });

      return;
    }


  };

  return Tone;
});
