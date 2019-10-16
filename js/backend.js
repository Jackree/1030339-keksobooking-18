'use strict';

(function () {
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;

  var load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Что-то пошло не так');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', url);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
