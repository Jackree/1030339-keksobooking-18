'use strict';

(function () {
  var Keycode = {
    ENTER: 13,
    ESC: 27
  };

  var isEnterEvent = function (evt) {
    return evt.keyCode === Keycode.ENTER;
  };

  var isEscEvent = function (evt) {
    return evt.keyCode === Keycode.ESC;
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var shuffleArray = function (array) {
    var j;
    var temp;

    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  };

  var getRandomArray = function (array) {
    return array.slice(0, getRandomNumber(0, array.length));
  };

  window.util = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,
    shuffleArray: shuffleArray,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();
