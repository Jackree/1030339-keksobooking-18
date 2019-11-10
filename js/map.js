'use strict';

(function () {
  var CoordsRange = {
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var mainPinCoords = {};

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

  var saveStartCoordinates = function () {
    var mainPinX = mapPinMain.style.left;
    var mainPinY = mapPinMain.style.top;
    mainPinCoords['startX'] = mainPinX;
    mainPinCoords['startY'] = mainPinY;
  };

  var resetPinPosition = function () {
    mapPinMain.style.top = mainPinCoords['startY'];
    mapPinMain.style.left = mainPinCoords['startX'];
    window.form.setAddress(parseInt(mainPinCoords['startX'], 10) + Math.floor(mapPinMainWidth / 2), parseInt(mainPinCoords['startY'], 10) + mapPinMainHeight);
  };

  var showMap = function () {
    mapSection.classList.remove('map--faded');
  };

  var hideMap = function () {
    mapSection.classList.add('map--faded');
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

    var getXCoord = function (x) {
      var start = mapPins.offsetLeft - mapPinMain.offsetWidth / 2;
      var end = mapPins.offsetLeft + mapPins.offsetWidth - mapPinMain.offsetWidth / 2;

      if (x < start) {
        return start;
      }

      if (x > end) {
        return end;
      }
      return x;
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

      if (elementCoords.top > CoordsRange.Y.MAX - mapPinMainHeight) {
        elementCoords.top = CoordsRange.Y.MAX - mapPinMainHeight;
      }

      if (elementCoords.top < CoordsRange.Y.MIN - mapPinMainHeight) {
        elementCoords.top = CoordsRange.Y.MIN - mapPinMainHeight;
      }

      mapPinMain.style.top = elementCoords.top + 'px';
      mapPinMain.style.left = getXCoord(elementCoords.left) + 'px';

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
      if (window.util.isEnterEvent(evt)) {
        window.main.activatePage();
      }
    }
  });

  mapPins.addEventListener('mousedown', function (evt) {
    onPinPressAction(evt);
  });

  mapPins.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      onPinPressAction(evt);
    }
  });

  window.map = {
    mapPins: mapPins,
    showMap: showMap,
    hideMap: hideMap,
    mapPinMainX: mapPinMainX,
    mapPinMainY: mapPinMainY,
    mapPinMainYDefault: mapPinMainYDefault,
    resetPinPosition: resetPinPosition,
    saveStartCoordinates: saveStartCoordinates
  };
})();
