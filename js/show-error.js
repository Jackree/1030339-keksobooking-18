'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);
  var errorMessageElement = errorElement.querySelector('.error__message');
  var errorButton = errorElement.querySelector('.error__button');

  var onErrorButtonClick = function (evt) {
    window.backend.load(window.backend.OFFERS_LOAD_URL, window.pin.renderPins, onError);
    evt.target.parentNode.remove();
  };

  var onError = function (errorMessage) {
    var mapSection = document.querySelector('.map');
    errorMessageElement.textContent = errorMessage;
    errorButton.addEventListener('click', onErrorButtonClick);
    mapSection.insertAdjacentElement('beforebegin', errorElement);
    return errorElement;
  };

  window.showError = {
    onError: onError
  };
})();
