import refs from './utils/refs';
import template from './templates/note.hbs';

const refreshList = (notes = []) => {
  const htmlNotesList = notes.map(note => template(note)).join('\n');
  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('afterbegin', htmlNotesList);
};

export { refreshList };
