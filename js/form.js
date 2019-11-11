'use strict';

(function () {
  var MAX_ROOMS = 100;
  var MIN_GUESTS = 0;
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddressInput = adForm.querySelector('#address');
  var adFormRoomSelect = adForm.querySelector('#room_number');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTimeInSelect = adForm.querySelector('#timein');
  var adFormTimeOutSelect = adForm.querySelector('#timeout');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var offerTypePriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var setAddress = function (xCoord, yCoord) {
    adFormAddressInput.value = xCoord + ', ' + yCoord;
  };

  var disableAdForm = function () {
    setAddress(window.map.mapPinMainX, window.map.mapPinMainYDefault);
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach(function (element) {
      element.disabled = true;
    });
  };

  var enableAdForm = function () {
    setAddress(window.map.mapPinMainX, window.map.mapPinMainY);
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (element) {
      element.disabled = false;
    });
  };

  var validateCapacity = function () {
    var roomsValue = parseInt(adFormRoomSelect.value, 10);
    var capacityValue = parseInt(adFormCapacitySelect.value, 10);

    switch (true) {
      case (capacityValue > roomsValue):
        adFormCapacitySelect.setCustomValidity('Гости не смогут разместиться в выбранном количестве комнат');
        break;
      case (capacityValue === MIN_GUESTS && roomsValue !== MAX_ROOMS):
        adFormCapacitySelect.setCustomValidity('Не для гостей только 100 комнат');
        break;
      default:
        adFormCapacitySelect.setCustomValidity('');
        break;
    }

    if (roomsValue === MAX_ROOMS && capacityValue !== MIN_GUESTS) {
      adFormRoomSelect.setCustomValidity('Выбранное количество комнат не для гостей');
    } else {
      adFormRoomSelect.setCustomValidity('');
    }
  };

  var setMinPrice = function () {
    adFormPriceInput.min = offerTypePriceMap[adFormTypeSelect.value];
    adFormPriceInput.placeholder = offerTypePriceMap[adFormTypeSelect.value];
  };

  var setOfferTimeIn = function () {
    adFormTimeInSelect.value = adFormTimeOutSelect.value;
  };

  var setOfferTimeOut = function () {
    adFormTimeOutSelect.value = adFormTimeInSelect.value;
  };

  adFormCapacitySelect.addEventListener('change', function () {
    validateCapacity();
  });

  adFormRoomSelect.addEventListener('change', function () {
    validateCapacity();
  });

  adFormTypeSelect.addEventListener('change', function () {
    setMinPrice();
  });

  adFormTimeInSelect.addEventListener('change', function () {
    setOfferTimeOut();
  });

  adFormTimeOutSelect.addEventListener('change', function () {
    setOfferTimeIn();
  });

  var deactivatePage = function () {
    window.pin.deletePins();
    window.card.closeCard();
    adForm.reset();
    setMinPrice();
    window.map.resetPinPosition();
    window.map.hideMap();
    window.form.disableAdForm();
    window.filter.deactivateFilter();
  };

  var onSuccessSubmit = function () {
    window.showSuccess.showSuccessMessage();
    deactivatePage();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(adForm);
    window.backend.save(data, SAVE_URL, onSuccessSubmit, window.showError.onError);
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatePage();
  });

  window.form = {
    disableAdForm: disableAdForm,
    enableAdForm: enableAdForm,
    validateCapacity: validateCapacity,
    setAddress: setAddress
  };
})();
