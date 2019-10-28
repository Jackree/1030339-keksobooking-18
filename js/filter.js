'use strict';

(function () {
  var PRICE = {
    MIDDLE: 10000,
    HIGH: 50000
  };

  var DEFAULT_FILTER_VALUE = 'any';

  var offersFilter = document.querySelector('.map__filters');
  var housingTypeSelect = offersFilter.querySelector('#housing-type');
  var housingPriceSelect = offersFilter.querySelector('#housing-price');
  var housingRoomsSelect = offersFilter.querySelector('#housing-rooms');
  var housingGuestsSelect = offersFilter.querySelector('#housing-guests');
  var features = offersFilter.querySelectorAll('input[type=checkbox]');

  var offers = [];
  var onSuccess = function (data) {
    offers = data;
    window.pin.renderPins(offers);
  };

  var getType = function (element) {
    if (housingTypeSelect.value !== DEFAULT_FILTER_VALUE) {
      return element.offer.type === housingTypeSelect.value;
    }
    return true;
  };

  var getPrice = function (element) {
    switch (housingPriceSelect.value) {
      case 'low':
        return element.offer.price < PRICE.MIDDLE;
      case 'middle':
        return element.offer.price >= PRICE.MIDDLE && element.offer.price <= PRICE.HIGH;
      case 'high':
        return element.offer.price > PRICE.HIGH;
      default:
        return true;
    }
  };

  var getRooms = function (element) {
    if (housingRoomsSelect.value !== DEFAULT_FILTER_VALUE) {
      return element.offer.rooms === parseInt(housingRoomsSelect.value, 10);
    }
    return true;
  };

  var getGuests = function (element) {
    if (housingGuestsSelect.value !== DEFAULT_FILTER_VALUE) {
      return element.offer.guests === parseInt(housingGuestsSelect.value, 10);
    }
    return true;
  };

  var getFeatures = function (element) {
    return Array.from(features)
      .filter(function (el) {
        return el.checked;
      })
      .map(function (it) {
        return it.value;
      })
      .every(function (feature) {
        return element.offer.features.includes(feature);
      });
  };


  var getFilteredOffers = function (data) {
    return data.filter(function (element) {
      return getType(element) &&
        getPrice(element) &&
        getRooms(element) &&
        getGuests(element) &&
        getFeatures(element);
    });
  };

  var updatePins = function () {
    window.pin.deletePins();
    window.card.closeCard();
    window.pin.renderPins(getFilteredOffers(offers));
  };

  offersFilter.addEventListener('change', function () {
    window.debounce(updatePins);
  });

  window.filter = {
    onSuccess: onSuccess,
    offers: offers
  };
})();
