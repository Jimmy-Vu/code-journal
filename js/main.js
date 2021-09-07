/* global data */
/* exported data */

var urlInput = document.querySelector('#input-url');
var photo = document.querySelector('#main-image');

function updatePhoto(event) {
  // if (photo.getAttribute('src') === '') {
  //   photo.setAttribute('src', 'images/placeholder-image-square.jpg';
  // }
  photo.setAttribute('src', event.target.value);
}

urlInput.addEventListener('input', updatePhoto);
