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

    /*
    * Get sound corresponding to some data
    *
    * @param {number} x             The x-coordinate of the point.
    * @param {number} y             The y-coordinate of the point.
    * @param {number} xUpperBound   The highest possible x value at the time of sampling.
    * @param {number} yUpperBound   The highest possible y value at the time of sampling.
    *
    * @return null
    */
    getPointSound: function(x, y, xUpperBound, yUpperBound) {
      // FIXME Get sound from Backend
      return null;
    },

    /* Get brush size based on args */
    getBrushSize: function(args) {},

  };

  return Controller;
})
