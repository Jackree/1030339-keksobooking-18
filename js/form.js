'use strict';

(function () {
  var MAX_ROOMS = 100;
  var MIN_GUESTS = 0;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddressInput = adForm.querySelector('#address');
  var adFormRoomSelect = adForm.querySelector('#room_number');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormTimeInSelect = adForm.querySelector('#timein');
  var adFormTimeOutSelect = adForm.querySelector('#timeout');

  var offerTypePriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var disableAdForm = function () {
    adFormAddressInput.value = window.map.mapPinMainX + ', ' + window.map.mapPinMainY;
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach(function (element) {
      element.disabled = true;
    });
  };

  var enableAdForm = function () {
    adFormAddressInput.value = window.map.mapPinMainX + ', ' + (window.map.mapPinMainY + window.map.mapPinMainArrowHeight);
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

  window.form = {
    disableAdForm: disableAdForm,
    enableAdForm: enableAdForm,
    validateCapacity: validateCapacity
  };
})();
