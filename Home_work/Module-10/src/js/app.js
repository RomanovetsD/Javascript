import Notepad from './Notepad';
import renderNoteList from './view/renderNoteList';
import { initialNotes } from './db';
import { refs } from './utils/constants';
import addNote from './controller/addNote';
import deleteNote from './controller/deleteNote';
import filteredItems from './controller/filterNode';
import changePriority from './view/changePriority';
import editNote from './view/editNote';
import saveEditNote from './view/saveEditNote';

const notepad = new Notepad(initialNotes);
renderNoteList(refs.list, notepad.notes);


refs.form.addEventListener('submit', addNote);
refs.list.addEventListener('click', deleteNote);
refs.search.addEventListener('input', filteredItems);
refs.list.addEventListener('click', changePriority);
refs.list.addEventListener('click', editNote);
refs.list.addEventListener('dblclick', saveEditNote);

export { notepad };
