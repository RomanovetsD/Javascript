'use strick';

/*
Напиши функцию renderNoteList(listRef, notes), которая получает ссылку на DOM-узел списка ul.note-list
и массив объектов заметок, вызывает createListItem(note) столько раз,
сколько объектов в массиве, после чего добавляет все карточки в список.
*/

function renderNoteList(listRef, notes) {
  const elem = listRef.cloneNode(false);
  elem.append(...notes.map(e => createListItem(e)));
  listRef.replaceWith(elem);
}
