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
var savedJournal = [];
var entryID = 0;

function submitListener(event) {
  event.preventDefault();

  savedJournal.unshift({
    title: title.value,
    photoURL: urlInput.value,
    notes: notes.value,
    entryID: entryID
  });
  entryID++;
  var jsonJournal = JSON.stringify(savedJournal);
  localStorage.setItem('journalEntry', jsonJournal);

  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
}

form.addEventListener('submit', submitListener);
