'use strict';

(function () {
  var activatePage = function () {
    window.form.enableAdForm();
    window.form.validateCapacity();
    window.map.showMap();
    window.backend.load(window.backend.OFFERS_LOAD_URL, window.pin.renderPins, window.showError.onError);
  };

  window.form.disableAdForm();

  window.main = {
    activatePage: activatePage
  };
})();
