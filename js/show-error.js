'use strict';

(function () {
  var mainSection = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);
  var errorMessageElement = errorElement.querySelector('.error__message');
  var errorButton = errorElement.querySelector('.error__button');

  var closeErrorMessage = function (evt) {
    if (evt.target !== errorMessageElement) {
      errorElement.remove();
      document.removeEventListener('click', closeErrorMessage);
      document.removeEventListener('keydown', onErrorMessageEscPress);
    }
  };

  var onErrorMessageEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeErrorMessage();
    }
  };

  var onError = function (errorMessage) {
    errorMessageElement.textContent = errorMessage;
    errorButton.addEventListener('click', closeErrorMessage);
    mainSection.insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', onErrorMessageEscPress);
    return errorElement;
  };

  window.showError = {
    onError: onError
  };
})();
