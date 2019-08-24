import { notepad } from '../app';


function saveEditNote(event) {
  event.preventDefault();
  const { target } = event;
  const li = target.closest('.note-list__item');
  const noteId = target.closest('.note');
  const { id } = noteId.dataset;
  const note = notepad.findNoteById(id);
  const title = li.querySelector('.note__title');
  const body = li.querySelector('.note__body');

  if (
    target.dataset.action === 'edit-note'
    || target.parentNode.dataset.action === 'edit-note'
  ) {
    title.setAttribute('contenteditable', false);
    body.setAttribute('contenteditable', false);
    title.style.backgroundColor = 'white';
    body.style.backgroundColor = 'white';
    target.style.backgroundColor = 'black';
    target.style.borderRadius = '25px';
    note.title = title.textContent;
    note.body = body.textContent;
  }
}

export default saveEditNote;
