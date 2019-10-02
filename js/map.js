'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  var mapSection = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapPinMainWidth = Math.floor(mapPinMain.clientWidth / 2);
  var mapPinMainHeight = Math.floor(mapPinMain.clientHeight / 2);
  var mapPinMainX = parseInt(mapPinMain.style.left, 10) + mapPinMainWidth;
  var mapPinMainY = parseInt(mapPinMain.style.top, 10) + mapPinMainHeight;
  var mapPinMainArrowHeight = 22;

  var showMap = function () {
    mapSection.classList.remove('map--faded');
  };

  mapPinMain.addEventListener('mousedown', function () {
    window.main.activatePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.main.activatePage();
    }
  });

  window.map = {
    mapPins: mapPins,
    showMap: showMap,
    mapPinMainX: mapPinMainX,
    mapPinMainY: mapPinMainY,
    mapPinMainArrowHeight: mapPinMainArrowHeight
  };
})();
