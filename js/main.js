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

var deleteButton = document.querySelector('#delete-button');

function submitListener(event) {
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryID === data.entries[i].entryID) {
        data.entries[i].title = title.value;
        data.entries[i].photoURL = urlInput.value;
        data.entries[i].notes = notes.value;
        editEntryTitle.replaceWith(newEntryTitle);

        deleteButton.className = 'hidden';
        var currentEntryEdit = document.querySelector('[data-entry-id="' + data.entries[i].entryID.toString() + '"]');
        currentEntryEdit.replaceWith(entryAdd(data.entries[i]));
        data.editing = null;
        break;
      }
    }
  } else {
    data.entries.unshift({
      title: title.value,
      photoURL: urlInput.value,
      notes: notes.value,
      entryID: data.nextEntryId
    });
    entryUL.prepend(entryAdd({
      title: title.value,
      photoURL: urlInput.value,
      notes: notes.value,
      entryID: data.nextEntryId
    }));
    data.nextEntryId++;
  }

  photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
  switchViews('entries');
}

form.addEventListener('submit', submitListener);

var entryUL = document.querySelector('#entry-list');
var noEntriesMessage = document.querySelector('#no-entries');

function entryAdd(entry) {
  var entryListing = document.createElement('li');
  entryListing.className = 'row entry';
  entryListing.setAttribute('data-entry-id', entry.entryID);

  var entryImage = document.createElement('img');
  entryImage.className = 'column-half';
  entryImage.setAttribute('src', entry.photoURL);
  entryListing.appendChild(entryImage);

  var entryDiv = document.createElement('div');
  entryDiv.className = 'column-half';
  entryListing.appendChild(entryDiv);

  var titleDiv = document.createElement('div');
  titleDiv.className = 'row justify-space-between';
  entryDiv.appendChild(titleDiv);

  var entryTitle = document.createElement('h2');
  var entryTitleText = document.createTextNode(entry.title);
  entryTitle.appendChild(entryTitleText);
  titleDiv.appendChild(entryTitle);

  var editIcon = document.createElement('i');
  editIcon.className = 'fas fa-pen';
  titleDiv.appendChild(editIcon);

  var entryNotes = document.createElement('p');
  var entryNotesText = document.createTextNode(entry.notes);
  entryNotes.appendChild(entryNotesText);
  entryDiv.appendChild(entryNotes);

  return entryListing;
}

window.addEventListener('DOMContentLoaded', domContentLoadedListener);

function domContentLoadedListener(event) {
  switchViews(data.view);

  if (data.entries.length !== 0) {
    noEntriesMessage.remove();
  }
  for (var i = 0; i < data.entries.length; i++) {
    entryUL.appendChild(entryAdd(data.entries[i]));
  }
}

var entriesNavItem = document.querySelector('#entry-nav');
var entriesNewButton = document.querySelector('#new-button');

entriesNewButton.addEventListener('click', dataViewHandler);
entriesNavItem.addEventListener('click', dataViewHandler);

var viewContainerList = document.querySelectorAll('.view-container');

function dataViewHandler(event) {
  var dataView = event.target.getAttribute('data-view');
  switchViews(dataView);
}

function switchViews(string) {
  for (var i = 0; i < viewContainerList.length; i++) {
    if (string === viewContainerList[i].getAttribute('data-view')) {
      viewContainerList[i].className = 'view-container container';
      data.view = string;
    } else {
      viewContainerList[i].className = 'view-container container hidden';
    }
  }
}

entryUL.addEventListener('click', entryListingClickHandler);

var newEntryTitle = document.querySelector('#new-entry-title');
var editEntryTitle = document.createElement('h1');
var editEntryTitleText = document.createTextNode('Edit Entry');
editEntryTitle.appendChild(editEntryTitleText);

function entryListingClickHandler(event) {
  if (event.target.className === 'fas fa-pen') {
    switchViews('entry-form');

    deleteButton.className = '';

    var closestLI = event.target.closest('li');

    for (var i = 0; i < data.entries.length; i++) {
      if (Number.parseInt(closestLI.getAttribute('data-entry-id')) === data.entries[i].entryID) {
        data.editing = data.entries[i];
      }
    }

    title.value = data.editing.title;
    urlInput.value = data.editing.photoURL;
    photo.setAttribute('src', data.editing.photoURL);
    notes.value = data.editing.notes;
    newEntryTitle.replaceWith(editEntryTitle);
  }

}

var modalHolder = document.querySelector('.modal-container');
deleteButton.addEventListener('click', deleteEntryListener);

function deleteEntryListener(event) {
  modalHolder.className = 'modal-container row justify-center align-center';
}

var cancelButton = document.querySelector('#cancel-button');
cancelButton.addEventListener('click', cancelButtonListener);

function cancelButtonListener(event) {
  modalHolder.className = 'modal-container row justify-center align-center hidden';
}

var deleteConfirmButton = document.querySelector('#delete-confirm-button');
deleteConfirmButton.addEventListener('click', deleteConfirmListener);

function deleteConfirmListener(event) {
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryID === data.entries[i].entryID) {
        deleteButton.className = 'hidden';
        var currentEntryEdit = document.querySelector('[data-entry-id="' + data.entries[i].entryID.toString() + '"]');
        data.entries.splice(i, 1);
        currentEntryEdit.remove();
        data.editing = null;

        modalHolder.className = 'modal-container row justify-center align-center hidden';
        photo.setAttribute('src', 'images/placeholder-image-square.jpg');
        form.reset();
        switchViews('entries');
        break;
      }
    }
  }
}
