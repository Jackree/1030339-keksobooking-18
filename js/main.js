'use strict';

(function () {
  var activatePage = function () {
    window.form.enableAdForm();
    window.form.validateCapacity();
    window.map.showMap();
    window.data.renderPins();
  };

  window.form.disableAdForm();

  window.main = {
    activatePage: activatePage
  };
})();
