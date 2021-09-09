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

function beforeunloadListener(event) {
  event.preventDefault();
  var jsonJournal = JSON.stringify(data);
  localStorage.setItem('journalEntry', jsonJournal);
}

window.addEventListener('beforeunload', beforeunloadListener);
