'use strict';

(function () {
  var KEYCODE = {
    ENTER: 13,
    ESC: 27
  };

  var onEnterEventAction = function (evt, action) {
    if (evt.keyCode === KEYCODE.ENTER) {
      action();
    }
  };

  var onEscEventAction = function (evt, action) {
    if (evt.keyCode === KEYCODE.ESC) {
      action();
    }
  };

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
    onEnterEventAction: onEnterEventAction,
    onEscEventAction: onEscEventAction
  };
})();
