define([
  'jquery',
  'Debug'
], function(
  $,
  Debug
) {

  Debug.enableScope('Tone');

  function Tone(args) {
    var self = this;

    Debug.log('Tone', 'inited object');

  };

  return Tone;
});
