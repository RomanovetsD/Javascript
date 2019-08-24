import renderNoteList from './renderNoteList';
import { refs } from '../utils/constants';
import { notepad } from '../app';

function noteRefresh() {
  refs.list.innerHTML = '';
  renderNoteList(refs.list, notepad.notes);
}

export default noteRefresh;
