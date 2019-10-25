'use strict';

(function () {
  var mainSection = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var successElement = successTemplate.cloneNode(true);

  var closeSuccessMessage = function () {
    successElement.remove();
    document.removeEventListener('mousedown', closeSuccessMessage);
    document.removeEventListener('keydown', onSuccessMessageEscPress);
  };

  var onSuccessMessageEscPress = function (evt) {
    window.util.onEscEventAction(evt, closeSuccessMessage);
  };

  var showSuccessMessage = function () {
    mainSection.insertAdjacentElement('afterbegin', successElement);
    document.addEventListener('mousedown', closeSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  window.showSuccess = {
    showSuccessMessage: showSuccessMessage
  };
})();
