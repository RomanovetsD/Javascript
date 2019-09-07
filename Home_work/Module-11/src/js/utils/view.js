import Handlebars from 'handlebars';

import refs from '../utils/refs';
import template from '../../template/note';
import { notepad } from './model';

const array = notepad.notes;

const refreshList = (data) => {
  const notes = data || array;
  const htmlNotesList = Handlebars.compile(template)({ notes });
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('afterbegin', htmlNotesList);
};

export { refreshList };