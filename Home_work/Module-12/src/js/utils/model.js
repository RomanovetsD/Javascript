import INITILAL_NOTES from "../../assets/notes.json";
import Notepad from "../components/Notepad";
import refs from './refs';
import { renderNoteList } from './app';


let notepad;
if (localStorage.getItem("notes") !== null) {
    let localNotes = JSON.parse(localStorage.getItem("notes"));
    notepad = new Notepad(localNotes);
  } else {
    notepad = new Notepad(initialNotes);
  }
renderNoteList(refs.list, notepad.notes);

export { notepad };