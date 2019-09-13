import shortid from 'shortid';
import MicroModal from 'micromodal';
import Handlebars from 'handlebars';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 


import template from '../../template/note.hbs'
import { NOTIFICATION_MESSAGES } from './constants';
import INITILAL_NOTES from '../../assets/notes.json';
import Notepad from '../components/Notepad';
import refs from '../utils/refs';
import { PRIORITY_TYPES, NOTE_ACTIONS } from '../utils/constants';
import { refreshList } from './view';
import { notepad } from './model';


MicroModal.init();


const notyf = new Notyf();

const closeEditor = () => {
  MicroModal.close('note-editor-modal');
};

const openEditor = () => {
  MicroModal.show('note-editor-modal');
};

const { NOTE_DELETED_SUCCESS, NOTE_ADDED_SUCCESS, EDITOR_FIELDS_EMPTY,} = NOTIFICATION_MESSAGES;

const notificationAdded = (message) => {
  const msg = message || NOTE_ADDED_SUCCESS;
  notyf.success(msg);
};

const notificationDeleted = (message) => {
  const msg = message || NOTE_DELETED_SUCCESS;
  notyf.success(msg);
};

const notificationError = (message) => {
  const msg = message || EDITOR_FIELDS_EMPTY;
  notyf.error(msg);
};

const state = {
  note: null,
};

refs.openEditor.addEventListener('click', openModalEditor);
refs.saveEditor.addEventListener('click', saveData);
refs.list.addEventListener('click', deleteData);
refs.list.addEventListener('click', editData);
refs.search.addEventListener('input', filterByText);
refs.search.addEventListener('blur', resetSearch);
refs.list.addEventListener('click', changePriority);

function openModalEditor(event) {
  event.preventDefault();
  openEditor();
}

function reset() {
  refs.title.value = '';
  refs.body.value = '';
}

function checkEmpty() {
  const title = refs.title.value.trim() || '';
  const body = refs.body.value.trim() || '';
  if (title.length === 0 || body.length === 0) {
    notificationError();
    return true;
  } return false;
}

function saveData(event) {
  event.preventDefault();
  const title = refs.title.value;
  const body = refs.body.value;
  if (checkEmpty()) {
    return;
  }
  if (!state.note) {
    const id = shortid.generate();
    const priority = PRIORITY_TYPES.LOW;
    notepad.saveNote({
      id, title, body, priority,
    });
    notificationAdded();
  }
  if (state.note) {
    state.note.title = title;
    state.note.body = body;
  }
  state.note = null;
  reset();
  closeEditor();
  refreshList(notepad.notes);
}

function deleteData({ target }) {
  state.note = null;
  const action = target.parentElement.dataset.action;
  if (action !== NOTE_ACTIONS.DELETE) {
  } else {
    notepad.deleteNote(target.closest('.note-list__item').dataset.id)
      .then(() => {
        target.closest('.note-list__item').remove();
        notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function editData({ target }) {
  const action = target.parentElement.dataset.action;
  if (action !== NOTE_ACTIONS.EDIT) {
    return;
  }
  const parentListItem = target.closest('.note-list__item');
  const id = parentListItem.dataset.id;
  const note = notepad.findNoteById(id);
  const { title, body } = note;
  refs.title.value = title;
  refs.body.value = body;
  state.note = note;
  openEditor();

}

function resetSearch(event) {
  event.preventDefault();
  refs.search.parentNode.reset();
}

function filterByText(event) {
  event.preventDefault();
  const { value } = event.target;
  const filtered = notepad.filterNotesByQuery(value);
  refreshList(filtered);
}

/* function filterByText(event) {
  event.preventDefault();
  notepad.filterNotesByQuery(event.target.value)
    .then((filter) => {
      renderNoteList(refs.list, filter);
    })
    .catch((error) => {
      console.log(error);
    });
}*/


function renderNoteList(listRef, note) {
  const listItems = note.map(item => template(item)).join('');
  listRef.insertAdjacentHTML('beforeend', listItems);
}

function changePriority({ target }) {
  const action = target.parentElement.dataset.action;
  if (action !== NOTE_ACTIONS.INCREASE_PRIORITY && action !== NOTE_ACTIONS.DECREASE_PRIORITY) {
    return;
  }
  const noteToEdit = notepad.findNoteById(target.closest(".note-list__item").dataset.id
  );
  if (action === NOTE_ACTIONS.DECREASE_PRIORITY && noteToEdit.priority > 0) {
    noteToEdit.priority -=1;
    noteRefresh();
  }
  if (action === NOTE_ACTIONS.INCREASE_PRIORITY && noteToEdit.priority < 2) {
    noteToEdit.priority +=1;
    noteRefresh();
  }
}

function noteRefresh() {
  refs.list.innerHTML = '';
  renderNoteList(refs.list, notepad.notes);
}


export { renderNoteList };

refreshList();