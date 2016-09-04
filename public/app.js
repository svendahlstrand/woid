var images = (function () {
  var cache = [];

  function fetch(callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'images.json', true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
          cache = JSON.parse(xmlhttp.responseText);

          callback.call(this, cache);
         }
      }
    };
    xmlhttp.send(null);
  }

  return {
    fetch: fetch
  };
}());

function updateImages() {
  images.fetch(function (filenames) {
    var imagesContainer = document.getElementById('images');

    while (imagesContainer.hasChildNodes()) {
      imagesContainer.removeChild(imagesContainer.lastChild);
    }

    filenames.forEach(function (filename) {
      var image = document.createElement('img');
      image.setAttribute('src', filename);

      imagesContainer.appendChild(image);
    });
  });

  setTimeout(updateImages, 5000);
}

updateImages();
