'use strict';

(function () {
  var OFFERS_QUANTITY = 8;
  var OFFER_HEADINGS = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4'];
  var OFFER_PRICE_MAX = 70000;
  var OFFER_PIN_WIDTH = 50;
  var OFFER_PIN_HEIGHT = 70;
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

  var getUserAvatar = function (id) {
    return 'img/avatars/user0' + (id + 1) + '.png';
  };

  var getOffer = function (id, locationX, locationY) {
    return {
      author: {
        avatar: getUserAvatar(id)
      },
      offer: {
        title: window.util.getRandomElement(OFFER_HEADINGS),
        address: locationX + ', ' + locationY,
        price: window.util.getRandomNumber(1, OFFER_PRICE_MAX),
        type: window.util.getRandomElement(OFFER_TYPES),
        rooms: window.util.getRandomElement(OFFER_ROOMS),
        guests: window.util.getRandomElement(OFFER_GUESTS),
        checkin: window.util.getRandomElement(OFFER_HOURS),
        checkout: window.util.getRandomElement(OFFER_HOURS),
        features: window.util.getRandomArray(window.util.shuffleArray(OFFER_FEATURES)),
        description: window.util.getRandomElement(OFFER_DESCRIPTIONS),
        photos: window.util.getRandomArray(window.util.shuffleArray(OFFER_PHOTOS))
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
      randomLocationX = window.util.getRandomNumber(X_LOCATION_MIN - OFFER_PIN_WIDTH / 2, X_LOCATION_MAX - OFFER_PIN_WIDTH / 2);
      randomLocationY = window.util.getRandomNumber(Y_LOCATION_MIN - OFFER_PIN_HEIGHT, Y_LOCATION_MAX - OFFER_PIN_HEIGHT);

      offers.push(getOffer(i, randomLocationX, randomLocationY));
    }

    return offers;
  };

  window.data = {
    OFFERS_QUANTITY: OFFERS_QUANTITY,
    getOffers: getOffers
  };
})();
