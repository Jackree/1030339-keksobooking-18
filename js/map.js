'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapPinMainWidth = Math.floor(mapPinMain.clientWidth / 2);
  var mapPinMainHeight = Math.floor(mapPinMain.clientHeight / 2);
  var mapPinMainX = parseInt(mapPinMain.style.left, 10) + mapPinMainWidth;
  var mapPinMainY = parseInt(mapPinMain.style.top, 10) + mapPinMainHeight;
  var mapPinMainArrowHeight = 16;

  var showMap = function () {
    mapSection.classList.remove('map--faded');
  };

  var onPinPressAction = function (evt) {
    var target = evt.target;
    var offerPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < offerPins.length; i++) {
      if (target.closest('.map__pin:not(.map__pin--main)') === offerPins[i]) {
        window.card.renderCards(i);
      }
    }
  };

  mapPinMain.addEventListener('mousedown', function () {
    window.main.activatePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.onEnterEventAction(evt, window.main.activatePage);
  });

  mapPins.addEventListener('mousedown', function (evt) {
    onPinPressAction(evt);
  });

  mapPins.addEventListener('keydown', function (evt) {
    window.util.onEnterEventAction(evt, onPinPressAction(evt));
  });

  window.map = {
    mapPins: mapPins,
    showMap: showMap,
    mapPinMainX: mapPinMainX,
    mapPinMainY: mapPinMainY,
    mapPinMainArrowHeight: mapPinMainArrowHeight
  };
})();
