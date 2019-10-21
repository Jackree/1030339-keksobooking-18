'use strict';

(function () {
  var housingTypeSelect = document.querySelector('#housing-type');

  var offers = [];
  var onSuccess = function (data) {
    offers = data;
    window.pin.renderPins(offers);
  };

  housingTypeSelect.addEventListener('change', function () {
    var typeValue = housingTypeSelect.value;
    var sameTypeOffers = offers;

    window.pin.deletePins();
    window.card.closeCard();

    if (!(typeValue === 'any')) {
      sameTypeOffers = offers.filter(function (element) {
        return element.offer.type === typeValue;
      });
    }

    window.pin.renderPins(sameTypeOffers);
  });

  window.filter = {
    onSuccess: onSuccess,
    offers: offers
  };
})();
