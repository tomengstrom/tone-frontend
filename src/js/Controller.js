/*
* Controller for handling data transfer from frontend to backend.
* 
*/
define([
  'Debug'
], function(
  Debug
) {

  Debug.enableScope('Controller');

  function Controller() {
    var self = this;
    return;
  };

  Controller.prototype = {
    exportGif: function() {},
    exportMP4: function() {},

    /* Save data to server */
    saveData: function() {},

    /* Get line quality based on args */
    getLineQuality: function(args) {},

    /* Get brush size based on args */
    getBrushSize: function(args) {}
  };

  return Controller;
})
