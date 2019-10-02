'use strict';

(function () {
  var MAX_ROOMS = 100;
  var MIN_GUESTS = 0;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddressInput = adForm.querySelector('#address');
  var adFormRoomSelect = adForm.querySelector('#room_number');
  var adFormCapacitySelect = adForm.querySelector('#capacity');

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

    if (capacityValue > roomsValue) {
      adFormCapacitySelect.setCustomValidity('Гости не смогут разместиться в выбранном количестве комнат');
    } else {
      adFormCapacitySelect.setCustomValidity('');
    }

    if (roomsValue === MAX_ROOMS && capacityValue !== MIN_GUESTS) {
      adFormRoomSelect.setCustomValidity('Выбранное количество комнат не для гостей');
    } else {
      adFormRoomSelect.setCustomValidity('');
    }
  };

  adFormCapacitySelect.addEventListener('change', function () {
    validateCapacity();
  });

  adFormRoomSelect.addEventListener('change', function () {
    validateCapacity();
  });

  window.form = {
    disableAdForm: disableAdForm,
    enableAdForm: enableAdForm,
    validateCapacity: validateCapacity
  };
})();