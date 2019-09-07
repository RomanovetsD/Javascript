import { NOTE_ACTIONS, refs } from '../utils/constants';
import noteRefresh from './noteRefresh';
import { notepad } from '../app';


function changePriority({ target }) {
  const action = target.parentElement.dataset.action;
  if (action !== NOTE_ACTIONS.INCREASE_PRIORITY && action !== NOTE_ACTIONS.DECREASE_PRIORITY) {
    return;
  }

  const noteId = target.closest('.note');
  const { id } = noteId.dataset;
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

export default changePriority;
