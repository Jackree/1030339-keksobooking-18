'use strict';

(function () {
  var Price = {
    MIDDLE: 10000,
    HIGH: 50000
  };

  var DEFAULT_FILTER_VALUE = 'any';

  var offersFilter = document.querySelector('.map__filters');
  var filterGroups = offersFilter.querySelectorAll('.map__filter');
  var featuresGroup = offersFilter.querySelector('.map__features');
  var housingTypeSelect = offersFilter.querySelector('#housing-type');
  var housingPriceSelect = offersFilter.querySelector('#housing-price');
  var housingRoomsSelect = offersFilter.querySelector('#housing-rooms');
  var housingGuestsSelect = offersFilter.querySelector('#housing-guests');
  var offers = [];

  var deactivateFilter = function () {
    offersFilter.reset();
    featuresGroup.disabled = true;
    filterGroups.forEach(function (element) {
      element.disabled = true;
    });
  };

  var activateFilter = function () {
    featuresGroup.disabled = false;
    filterGroups.forEach(function (element) {
      element.disabled = false;
    });
  };

  var onSuccess = function (data) {
    offers = data;
    window.pin.renderPins(offers);
    activateFilter();
  };

  var isTypeSimilar = function (element) {
    if (housingTypeSelect.value !== DEFAULT_FILTER_VALUE) {
      return element.offer.type === housingTypeSelect.value;
    }
    return true;
  };

  var isPriceSimilar = function (element) {
    switch (housingPriceSelect.value) {
      case 'low':
        return element.offer.price < Price.MIDDLE;
      case 'middle':
        return element.offer.price >= Price.MIDDLE && element.offer.price <= Price.HIGH;
      case 'high':
        return element.offer.price > Price.HIGH;
      default:
        return true;
    }
  };

  var isRoomNumbersSimilar = function (element) {
    if (housingRoomsSelect.value !== DEFAULT_FILTER_VALUE) {
      return element.offer.rooms === parseInt(housingRoomsSelect.value, 10);
    }
    return true;
  };

  var isGuestsSimilar = function (element) {
    if (housingGuestsSelect.value !== DEFAULT_FILTER_VALUE) {
      return element.offer.guests === parseInt(housingGuestsSelect.value, 10);
    }
    return true;
  };

  var isFeaturesSimilar = function (element) {
    var checkedFeatures = offersFilter.querySelectorAll('.map__checkbox:checked');
    return Array.prototype.slice.call(checkedFeatures).every(function (item) {
      return element.offer.features.indexOf(item.value) >= 0;
    });
  };

  var isOffersSimilar = function (data) {
    return data.filter(function (element) {
      return isTypeSimilar(element) &&
        isPriceSimilar(element) &&
        isRoomNumbersSimilar(element) &&
        isGuestsSimilar(element) &&
        isFeaturesSimilar(element);
    });
  };

  var updatePins = function () {
    window.pin.deletePins();
    window.card.closeCard();
    window.pin.renderPins(isOffersSimilar(offers));
  };

  offersFilter.addEventListener('change', function () {
    window.debounce(updatePins);
  });

  window.filter = {
    onSuccess: onSuccess,
    offers: offers,
    deactivateFilter: deactivateFilter,
    activateFilter: activateFilter
  };
})();
