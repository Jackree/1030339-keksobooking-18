'use strict';

var ENTER_KEYCODE = 13;
var OFFERS_QUANTITY = 8;
var MAX_ROOMS = 100;
var MIN_GUESTS = 0;
var OFFER_HEADINGS = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4'];
var OFFER_PRICE_MAX = 70000;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_ROOMS = [1, 2, 3];
var OFFER_GUESTS = [0, 1, 2];
var OFFER_HOURS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTIONS = ['Описание 1', 'Описание 2', 'Описание 3'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var X_LOCATION_MIN = 0;
var X_LOCATION_MAX = document.querySelector('.map').offsetWidth;
var Y_LOCATION_MIN = 130;
var Y_LOCATION_MAX = 630;

var mapSection = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var similarOffersTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var mapPinMain = mapPins.querySelector('.map__pin--main');
var mapPinMainWidth = Math.floor(mapPinMain.clientWidth / 2);
var mapPinMainHeight = Math.floor(mapPinMain.clientHeight / 2);
var mapPinMainX = parseInt(mapPinMain.style.left, 10) + mapPinMainWidth;
var mapPinMainY = parseInt(mapPinMain.style.top, 10) + mapPinMainHeight;
var mapPinMainArrowHeight = 22;

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adFormAddressInput = adForm.querySelector('#address');
var adFormRoomSelect = adForm.querySelector('#room_number');
var adFormCapacitySelect = adForm.querySelector('#capacity');

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getUserAvatar = function (id) {
  return 'img/avatars/user0' + (id + 1) + '.png';
};

var showSimilarOffers = function () {
  mapSection.classList.remove('map--faded');
};

var shuffleArray = function (array) {
  var j;
  var temp;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

var getRandomArray = function (array) {
  return array.slice(0, getRandomNumber(0, array.length));
};

var getOffer = function (id, locationX, locationY) {
  return {
    author: {
      avatar: getUserAvatar(id)
    },
    offer: {
      title: getRandomElement(OFFER_HEADINGS),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(1, OFFER_PRICE_MAX),
      type: getRandomElement(OFFER_TYPES),
      rooms: getRandomElement(OFFER_ROOMS),
      guests: getRandomElement(OFFER_GUESTS),
      checkin: getRandomElement(OFFER_HOURS),
      checkout: getRandomElement(OFFER_HOURS),
      features: getRandomArray(shuffleArray(OFFER_FEATURES)),
      description: getRandomElement(OFFER_DESCRIPTIONS),
      photos: getRandomArray(shuffleArray(OFFER_PHOTOS))
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

var getOffers = function (quantity) {
  var offers = [];
  var randomLocationX;
  var randomLocationY;

  for (var i = 0; i < quantity; i++) {
    randomLocationX = getRandomNumber(X_LOCATION_MIN, X_LOCATION_MAX);
    randomLocationY = getRandomNumber(Y_LOCATION_MIN, Y_LOCATION_MAX);

    offers.push(getOffer(i, randomLocationX, randomLocationY));
  }

  return offers;
};

var renderPin = function (pin) {
  var pinElement = similarOffersTemplate.cloneNode(true);
  var photo = pinElement.querySelector('img[src]');
  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
  photo.src = pin.author.avatar;
  photo.alt = pin.offer.title;
  return pinElement;
};

var renderPins = function () {
  var offers = getOffers(OFFERS_QUANTITY);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  mapPins.appendChild(fragment);
};

var disableAdForm = function () {
  adFormAddressInput.value = mapPinMainX + ', ' + mapPinMainY;
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach(function (element) {
    element.disabled = true;
  });
};

var enableAdForm = function () {
  adFormAddressInput.value = mapPinMainX + ', ' + (mapPinMainY + mapPinMainArrowHeight);
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

var activatePage = function () {
  enableAdForm();
  validateCapacity();
  showSimilarOffers();
  renderPins();
};

adFormCapacitySelect.addEventListener('change', function () {
  validateCapacity();
});

adFormRoomSelect.addEventListener('change', function () {
  validateCapacity();
});

mapPinMain.addEventListener('mousedown', function () {
  activatePage();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

disableAdForm();
