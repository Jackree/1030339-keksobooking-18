'use strict';

(function () {
  var OFFERS_LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  var activatePage = function () {
    window.map.saveStartCoordinates();
    window.form.enableAdForm();
    window.form.validateCapacity();
    window.map.showMap();
    window.backend.load(OFFERS_LOAD_URL, window.filter.onSuccess, window.showError.onError);
  };

  window.filter.deactivateFilter();
  window.form.disableAdForm();

  window.main = {
    activatePage: activatePage
  };
})();
