/*
* Tone Single Page App (SAP) object.
* Handles switching between states (introduction, mapping, drawing)
* and links events from frontend views to the backend controller and soundplayer.
*
*/
define([
  'jquery',
  'Debug',
  'Controller',
  'SoundPlayer',
  'ColorMapper'
], function(
  $,
  Debug,
  Controller,
  SoundPlayer,
  ColorMapper
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

    // CREATE VIEWS
    // Color mapper
    self.__colorMapper = new ColorMapper({
      tone: self
    });

    var controllerContainer = $('<div></div>');
    controllerContainer.addClass('tone_controller-container');
    self.__element.append(controllerContainer);

    var nextButton = $('<button>Next</button>');
    var prevButton = $('<button>Prev</button>');

    controllerContainer.append(nextButton);
    controllerContainer.append(prevButton);

    // Painter
    //self.__painter = new Painter({
    //  tone: self
    //});

    // Set the current view
    self.__setView( self.__colorMapper );

    return;
  };

  Tone.prototype = {

    /*
    * Sets the currently enabled view.
    * @param {object} view    A view (ColorMapper, Painter or Intro).
    * @returns null
    */
    __setView: function(view) {
      var self = this;

      // FIXME remove/hide the current view element

      // Append the view element to body
      $('body').append( view.getElement() );

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
    * // FIXME how is this mapping normalized ?
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
