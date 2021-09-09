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
  form.reset();
}

form.addEventListener('submit', submitListener);

var entryUL = document.querySelector('#entry-list');

function entryAdd(entry) {
  var entryListing = document.createElement('li');
  var firstChild = entryUL.firstChild;
  entryListing.className = 'row entry';
  entryUL.insertBefore(entryListing, firstChild);

  var entryImage = document.createElement('img');
  entryImage.className = 'column-half';
  entryImage.setAttribute('src', entry.photoURL);
  entryListing.appendChild(entryImage);

  var entryDiv = document.createElement('div');
  entryDiv.className = 'column-half';
  entryListing.appendChild(entryDiv);

  var entryTitle = document.createElement('h2');
  var entryTitleText = document.createTextNode(entry.title);
  entryTitle.appendChild(entryTitleText);
  entryDiv.appendChild(entryTitle);

  var entryNotes = document.createElement('p');
  var entryNotesText = document.createTextNode(entry.notes);
  entryNotes.appendChild(entryNotesText);
  entryDiv.appendChild(entryNotes);
}

var testObject =
    {
      title: 'Jimmy',
      photoURL: 'https://camo.githubusercontent.com/eaf1d896ea6dc83f571a87ce0fa5f99e8fedd4dc8e217a855c153e065b3c3ad5/68747470733a2f2f6c667a2d7374617469632e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f67726170686963732f776972656672616d65732f636f64652d6a6f75726e616c2f6669676d612f757365722d63616e2d766965772d74686569722d656e74726965732d6d6f62696c652e706e67',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };

entryAdd(testObject);
