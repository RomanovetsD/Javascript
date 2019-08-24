import { NOTE_ACTIONS, refs } from '../utils/constants';
import { notepad } from '../app';

function deleteNote({ target }) {
  const action = target.parentElement.dataset.action;
  if (action !== NOTE_ACTIONS.DELETE) {
    return;
  }
  const parentListItem = target.closest('.note-list__item');
  const id = parentListItem.dataset.id;
  notepad.deleteNote(id);
  parentListItem.remove();
}

export default deleteNote;
