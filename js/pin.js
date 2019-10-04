'use strict';

(function () {
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

  var renderPins = function () {
    var offers = window.data.getOffers(window.data.OFFERS_QUANTITY);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderPin(offers[i]));
    }
    window.map.mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
