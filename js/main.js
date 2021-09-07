/* global data */
/* exported data */

var urlInput = document.querySelector('#input-url');
var photo = document.querySelector('#main-image');

function updatePhoto(event) {
  photo.setAttribute('src', event.target.value);
}

urlInput.addEventListener('input', updatePhoto);

var form = document.querySelector('#form');
var title = document.querySelector('#title-text');
var notes = document.querySelector('#notes-text');
var saveSubmit = document.querySelector('#save-button');
var savedJournal = {};

function submitListener(event) {
  event.preventDefault();
  savedJournal = {
    title: title.value,
    photoURL: urlInput.value,
    notes: notes.value
  };
}

form.addEventListener('submit', submitListener);
