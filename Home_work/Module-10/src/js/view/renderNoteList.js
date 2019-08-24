import createListItem from './createListitem';

function renderNoteList(listRef, notes) {
  listRef.innerHTML = '';
  listRef.append(...notes.map(e => createListItem(e)));
}

export default renderNoteList;
