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

window.addEventListener('DOMContentLoaded', domContentLoadedListener);

function domContentLoadedListener(event) {
  for (var i = (data.entries.length - 1); i >= 0; i--) {
    entryAdd(data.entries[i]);
  }
}

var entriesNavItem = document.querySelector('#entry-nav');
var entriesNewButton = document.querySelector('#new-button');
var entryFormContainer = document.querySelector('[data-view="entry-form"]');
var entriesMainContainer = document.querySelector('[data-view="entries"]');

entriesNewButton.addEventListener('click', entriesNewButtonHandler);

function entriesNewButtonHandler(event) {
  entryFormContainer.className = 'container';
  entriesMainContainer.className = 'container hidden';
}

entriesNavItem.addEventListener('click', entriesNavItemHandler);

function entriesNavItemHandler(event) {
  entryFormContainer.className = 'container hidden';
  entriesMainContainer.className = 'container';
}
