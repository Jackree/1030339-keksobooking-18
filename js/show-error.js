'use strict';

(function () {
  var mainSection = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorElement = errorTemplate.cloneNode(true);
  var errorMessageElement = errorElement.querySelector('.error__message');
  var errorButton = errorElement.querySelector('.error__button');

  var closeErrorMessage = function () {
    errorElement.remove();
    document.removeEventListener('mousedown', closeErrorMessage);
    document.removeEventListener('keydown', onErrorMessageEscPress);
  };

  var onErrorMessageEscPress = function (evt) {
    window.util.onEscEventAction(evt, closeErrorMessage);
  };

  var onError = function (errorMessage) {
    errorMessageElement.textContent = errorMessage;
    errorButton.addEventListener('click', closeErrorMessage);
    mainSection.insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('mousedown', closeErrorMessage);
    document.addEventListener('keydown', onErrorMessageEscPress);
    return errorElement;
  };

  window.showError = {
    onError: onError
  };
})();
