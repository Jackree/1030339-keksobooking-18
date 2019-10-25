'use strict';

(function () {
  var CoordsRange = {
    Y: {
      MIN: 130,
      MAX: 630
    },
    X: {
      MIN: 0,
      MAX: 1200
    }
  };

  var mainPinDefaultCoords = {
    X: 570,
    Y: 375
  };

  var mapSection = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapPinMainWidth = mapPinMain.clientWidth;
  var mapPinMainHeightDefault = mapPinMain.clientHeight;
  var mapPinMainX = Math.floor(mapPinMain.offsetLeft + mapPinMainWidth / 2);
  var mapPinMainYDefault = Math.floor(mapPinMain.offsetTop + mapPinMainHeightDefault / 2);
  var mapPinMainArrowHeight = 16;
  var mapPinMainHeight = mapPinMainHeightDefault + mapPinMainArrowHeight;
  var mapPinMainY = mapPinMain.offsetTop + mapPinMainHeight;

  var resetPinPosition = function () {
    mapPinMain.style.top = mainPinDefaultCoords.Y + 'px';
    mapPinMain.style.left = mainPinDefaultCoords.X + 'px';
    window.form.setAddress(mainPinDefaultCoords.X + Math.floor(mapPinMainWidth / 2), mainPinDefaultCoords.Y + mapPinMainHeight);
  };

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

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (mapSection.classList.contains('map--faded')) {
      window.main.activatePage();
    }

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var elementCoords = {
        top: mapPinMain.offsetTop - shift.y,
        left: mapPinMain.offsetLeft - shift.x
      };

      if (elementCoords.left < CoordsRange.X.MIN) {
        elementCoords.left = CoordsRange.X.MIN;
      }

      if (elementCoords.left > CoordsRange.X.MAX - mapPinMainWidth) {
        elementCoords.left = CoordsRange.X.MAX - mapPinMainWidth;
      }

      if (elementCoords.top > CoordsRange.Y.MAX - mapPinMainHeight) {
        elementCoords.top = CoordsRange.Y.MAX - mapPinMainHeight;
      }

      if (elementCoords.top < CoordsRange.Y.MIN - mapPinMainHeight) {
        elementCoords.top = CoordsRange.Y.MIN - mapPinMainHeight;
      }

      mapPinMain.style.top = elementCoords.top + 'px';
      mapPinMain.style.left = elementCoords.left + 'px';

      window.form.setAddress(elementCoords.left + Math.floor(mapPinMainWidth / 2), elementCoords.top + mapPinMainHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (mapSection.classList.contains('map--faded')) {
      window.util.onEnterEventAction(evt, window.main.activatePage);
    }
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
    mapPinMainYDefault: mapPinMainYDefault,
    resetPinPosition: resetPinPosition
  };
})();
