'use strict';

(function () {
  var offerCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var mapSection = document.querySelector('.map');
  var mapFilters = mapSection.querySelector('.map__filters-container');
  var cardElement = offerCardTemplate.cloneNode(true);
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

  var clearElement = function (element) {
    while (element.lastElementChild) {
      element.removeChild(element.lastElementChild);
    }
  };

  var onCardPopupEscPress = function (evt) {
    window.util.onEscEventAction(evt, closeCard);
  };

  var showCard = function () {
    cardElement.classList.remove('hidden');
    document.addEventListener('keydown', onCardPopupEscPress);
  };

  var closeCard = function () {
    cardElement.classList.add('hidden');
    document.removeEventListener('keydown', onCardPopupEscPress);
  };

  var createFeaturesListItems = function (ad) {
    clearElement(cardFeaturesList);
    for (var i = 0; i < ad.offer.features.length; i++) {
      var element = document.createElement('li');
      element.className = 'popup__feature popup__feature--' + ad.offer.features[i];
      cardFeaturesList.appendChild(element);
    }
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

  var renderPhotos = function (ad) {
    clearElement(cardPhotos);
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var photoSrc = ad.offer.photos[i];
      cardPhotos.appendChild(renderPhoto(photoSrc));
    }
  };

  var renderCard = function (ad) {
    cardTitle.textContent = ad.offer.title;
    cardAddress.textContent = ad.offer.address;
    cardPrice.textContent = ad.offer.price + '₽/ночь';
    cardType.textContent = offerTypeMap[ad.offer.type];
    cardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardDescription.textContent = ad.offer.description;
    renderPhotos(ad);
    cardAvatar.src = ad.author.avatar;
    createFeaturesListItems(ad);

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
    window.util.onEnterEventAction(evt, closeCard);
  });

  window.card = {
    renderCards: renderCards
  };
})();
