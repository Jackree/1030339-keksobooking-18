'use strict';

(function () {
  var OFFERS_QUANTITY = 5;
  var mapSection = document.querySelector('.map');
  var similarOffersPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = similarOffersPinTemplate.cloneNode(true);
    var photo = pinElement.querySelector('img[src]');
    pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
    photo.src = pin.author.avatar;
    photo.alt = pin.offer.title;
    return pinElement;
  };

  var renderPins = function (offers) {
    window.pin.offers = offers;
    var fragment = document.createDocumentFragment();
    var takeNumber = offers.length > OFFERS_QUANTITY ? OFFERS_QUANTITY : offers.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(offers[i]));
    }
    window.map.mapPins.appendChild(fragment);
  };

  var deletePins = function () {
    var offerPins = mapSection.querySelectorAll('.map__pin:not(.map__pin--main)');
    [].forEach.call(offerPins, function (pin) {
      pin.parentNode.removeChild(pin);
    });
  };

  window.pin = {
    renderPins: renderPins,
    deletePins: deletePins
  };
})();
