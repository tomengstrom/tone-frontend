/*
* Class for handling sound playing.
*/
define([
  'Debug'
], function(
  Debug
) {

  Debug.enableScope('SoundPlayer');

  function SoundPlayer() {
    var self = this;
    Debug.log('SoundPlayer', 'constructed');
    return;
  };

  SoundPlayer.prototype = {
    /*
    * Plays a sound.
    *
    * @param  {object} soundArgs   object containing params.
    *
    * @return null
    */
    playSound: function(soundArgs) {
        var self = this;
        Debug.log('SoundPlayer', 'playing sound', soundArgs );
        return null;
    }
  };

  return SoundPlayer;

});
