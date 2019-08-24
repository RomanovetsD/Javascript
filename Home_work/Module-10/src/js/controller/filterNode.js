import renderNoteList from '../view/renderNoteList';
import { refs } from '../utils/constants';
import { notepad } from '../app';

function filteredItems(e) {
  const filterItems = notepad.filterNotesByQuery(e.target.value);
  renderNoteList(refs.list, filterItems);
}

export default filteredItems;
