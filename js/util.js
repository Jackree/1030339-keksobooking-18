'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var onEnterEventAction = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var onEscEventAction = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
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
