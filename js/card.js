'use strict';

(function () {
  var offerCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var mapSection = document.querySelector('.map');
  var cardElement = offerCardTemplate.cloneNode(true);
  var mapFilters = mapSection.querySelector('.map__filters-container');
  var cardCloseButton = cardElement.querySelector('.popup__close');
  var cardTitle = cardElement.querySelector('.popup__title');
  var cardAddress = cardElement.querySelector('.popup__text--address');
  var cardPrice = cardElement.querySelector('.popup__text--price');
  var cardType = cardElement.querySelector('.popup__type');
  var cardCapacity = cardElement.querySelector('.popup__text--capacity');
  var cardTime = cardElement.querySelector('.popup__text--time');
  var cardFeaturesList = cardElement.querySelector('.popup__features');
  var cardDescription = cardElement.querySelector('.popup__description');
  var cardPhotos = cardElement.querySelector('.popup__photos');
  var cardAvatar = cardElement.querySelector('.popup__avatar');

  var offerTypeMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var createFragment = function (array, createHtml, countLimit) {
    var fragment = document.createDocumentFragment();
    var count = array.length;
    if (countLimit > 0 && array.length > countLimit) {
      count = countLimit;
    }
    for (var i = 0; i < count; i++) {
      fragment.appendChild(createHtml(array[i]));
    }
    return fragment;
  };

  var onCardPopupEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeCard();
    }
  };

  var showCard = function () {
    cardElement.classList.remove('hidden');
    document.addEventListener('keydown', onCardPopupEscPress);
  };

  var closeCard = function () {
    cardElement.classList.add('hidden');
    document.removeEventListener('keydown', onCardPopupEscPress);
  };

  var createFeaturesListItem = function (advertFeature) {
    var element = document.createElement('li');
    element.className = 'popup__feature popup__feature--' + advertFeature;
    return element;
  };

  var renderPhoto = function (photoSrc) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = photoSrc;
    photo.width = '45';
    photo.height = '40';
    photo.alt = 'Фотография жилья';
    return photo;
  };

  var renderCard = function (advert) {
    var featuresFragment = createFragment(advert.offer.features, createFeaturesListItem, 0);
    var photosFragment = createFragment(advert.offer.photos, renderPhoto, 0);
    cardTitle.textContent = advert.offer.title;
    cardAddress.textContent = advert.offer.address;
    cardPrice.textContent = advert.offer.price + '₽/ночь';
    cardType.textContent = offerTypeMap[advert.offer.type];
    cardCapacity.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardFeaturesList.innerHTML = '';
    cardFeaturesList.appendChild(featuresFragment);
    cardDescription.textContent = advert.offer.description;
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(photosFragment);
    cardAvatar.src = advert.author.avatar;

    return cardElement;
  };

  var renderCards = function (id) {
    var offers = window.pin.offers;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(offers[id]));
    mapFilters.before(fragment);
    showCard();
  };

  cardCloseButton.addEventListener('mousedown', function () {
    closeCard();
  });

  cardCloseButton.addEventListener('keydown', function (evt) {
    if (window.util.isEnterEvent(evt)) {
      closeCard();
    }
  });

  window.card = {
    renderCards: renderCards,
    closeCard: closeCard
  };
})();
