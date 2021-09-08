/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('journalEntry');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

var form = document.querySelector('#form');
var title = document.querySelector('#title-text');
var urlInput = document.querySelector('#input-url');
var notes = document.querySelector('#notes-text');
var photo = document.querySelector('#main-image');

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

function beforeunloadListener(event) {
  var jsonJournal = JSON.stringify(data);
  localStorage.setItem('journalEntry', jsonJournal);
}

window.addEventListener('beforeunload', beforeunloadListener);
