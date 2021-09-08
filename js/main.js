/* global data */
/* exported data */

var urlInput = document.querySelector('#input-url');
var photo = document.querySelector('#main-image');

function updatePhoto(event) {
  photo.setAttribute('src', event.target.value);
  if (event.target.value === '') {
    photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

urlInput.addEventListener('input', updatePhoto);

var form = document.querySelector('#form');
var title = document.querySelector('#title-text');
var notes = document.querySelector('#notes-text');

function submitListener(event) {
  event.preventDefault();
  data.entries.unshift({
    title: title.value,
    photoURL: urlInput.value,
    notes: notes.value,
    entryID: data.nextEntryId
  });
  data.nextEntryId++;

  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  title.value = '';
  urlInput.value = '';
  notes.value = '';
}

form.addEventListener('submit', submitListener);
