'use strict';

(function () {
  var OFFERS_LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  var activatePage = function () {
    window.form.enableAdForm();
    window.form.validateCapacity();
    window.map.showMap();
    window.backend.load(OFFERS_LOAD_URL, window.pin.renderPins, window.showError.onError);
  };

  window.form.disableAdForm();

  window.main = {
    activatePage: activatePage
  };
})();
