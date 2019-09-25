import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import MicroModal from 'micromodal';
import { refreshList } from './view';
import { notepad } from './model';
import refs from './utils/refs';
import template from './templates/note.hbs';

import { NOTIFICATION_MESSAGES, PRIORITY_TYPES, NOTE_ACTIONS } from './utils/constants';

const notyf = new Notyf();
MicroModal.init();

const closeEditor = () => {
  MicroModal.close('note-editor-modal');
};

const openEditor = () => {
  MicroModal.show('note-editor-modal');
};

const {
  NOTE_ADDED_SUCCESS,
  NOTE_DELETED_SUCCESS,
  EDITOR_FIELDS_EMPTY,
} = NOTIFICATION_MESSAGES;

const state = {
  note: null,
};


function checkEmpty() {
  const title = refs.title.value.trim() || '';
  const body = refs.body.value.trim() || '';
  if (title.length === 0 || body.length === 0) {
    return true;
  }
  return false;
}

function filterByText(e) {
  e.preventDefault();
  const { value } = e.target;
  const filtered = notepad.filterNotesByQuery(value);
  refreshList(filtered);
}

function deleteData({ target }) {
  state.note = null;
  if (target.nodeName !== 'I') return;
  if (target.parentNode.dataset.action === 'delete-note') {
    const li = target.closest('.note-list__item');
    const { id } = li.dataset;
    li.remove();
    notepad.deleteNote(id);
    notyf.success(NOTE_DELETED_SUCCESS);
  }
}

function reset() {
  refs.title.value = '';
  refs.body.value = '';
}

function exitEdit() {
  reset();
  closeEditor();
  refreshList(notepad.get());
  state.note = null;
}

function editData({ target }) {
  if (target.nodeName !== 'I') return;
  if (target.parentNode.dataset.action === 'edit-note') {
    const li = target.closest('.note-list__item');
    const { id } = li.dataset;
    const note = notepad.findNoteById(id);
    const { title, body } = note;
    refs.title.value = title;
    refs.body.value = body;
    state.note = note;
    openEditor();
  }
}

function resetSearch(e) {
  e.preventDefault();
  refs.search.parentNode.reset();
}

function updateData() {
  const title = refs.title.value;
  const body = refs.body.value;
  state.note.title = title;
  state.note.body = body;
  const { id } = state.note;
  notepad.updateNoteContent(id, { title, body }).then(() => {
    exitEdit();
  });
}

function openModalEditor(e) {
  e.preventDefault();
  openEditor();
}

function saveData(e) {
  e.preventDefault();
  const title = refs.title.value;
  const body = refs.body.value;
  if (checkEmpty()) {
    notyf.error(EDITOR_FIELDS_EMPTY);
    return;
  }
  if (!state.note) {
    const priority = 0;
    notepad.saveNote({ title, body, priority }).then((data) => {
      notyf.success(NOTE_ADDED_SUCCESS);
      exitEdit();
    });
  }
  if (state.note) {
    updateData();
  }
}

function renderNoteList(listRef, note) {
  const listItems = note.map(item => template(item)).join('');
  listRef.insertAdjacentHTML('beforeend', listItems);
}

function noteRefresh() {
  refs.list.innerHTML = '';
  renderNoteList(refs.list, notepad._notes);
}

function changePriority({ target }) {
  const action = target.parentElement.dataset.action;
  if (action !== NOTE_ACTIONS.INCREASE_PRIORITY && action !== NOTE_ACTIONS.DECREASE_PRIORITY) {
    return;
  }
  const id = target.closest('.note-list__item').dataset.id;
  const note = notepad.findNoteById(id);
  if (action === NOTE_ACTIONS.DECREASE_PRIORITY && note.priority > 0) {
    note.priority -= 1;
    noteRefresh();
  }
  if (action === NOTE_ACTIONS.INCREASE_PRIORITY && note.priority < 2) {
    note.priority += 1;
    noteRefresh();
  }
}


refs.list.addEventListener('click', changePriority);
refs.editorSave.addEventListener('click', saveData);
refs.list.addEventListener('click', deleteData);
refs.list.addEventListener('click', editData);
refs.search.addEventListener('input', filterByText);
refs.search.addEventListener('blur', resetSearch);
refs.openEditor.addEventListener('click', openModalEditor);


notepad.getNotes().then(data => refreshList(data));
