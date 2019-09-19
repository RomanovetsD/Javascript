import * as api from '../services/api';

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get() {
    return this._notes;
  }

  getNotes() {
    return api.getNotes().then((notes) => {
      this._notes = notes;
      return notes;
    });
  }

  findNoteById(id) {
    const note = this._notes.find(item => item.id === id);
    return note;
  }

  saveNote(note) {
    return api.saveNotes(note).then((note) => {
      this._notes.push(note);
      return note;
    });
  }

  deleteNote(id) {
    return api.deleteNotes(id).then(() => {
      this.getNotes();
    });
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    if (!note) return;
    Object.assign(note, updatedContent);
    return api.updateNotes(id, note);
  }

  findIndexNoteById(id) {
    for (const index in this._notes) {
      if (this._notes[index].id === id) {
        return index;
      }
    }
    return -1;
  }

  updateNotePriority(id, priority) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = (this.findNoteById(id).priority += priority);
        resolve(result);
      }, 0);
    });
  }

  filterNotesByPriority(priority) {
    return this._notes.filter(e => e.priotity === priority);
  }

  filterNotesByQuery(query) {
    return this._notes.filter(note => note.body.toLowerCase().includes(query.toLowerCase()));
  }
}

export default Notepad;
