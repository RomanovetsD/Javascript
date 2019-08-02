'use strick';

class Notepad {
  constructor(arr) {
    this._notes = arr;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    const note = this._notes.find(item => item.id === id);

    return note;
  }

  saveNote(note) {
    this._notes.push(note);
    return note;
  }

  deleteNote(id) {
    this._notes = this._notes.filter(note => note.id !== id);
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    if (!note) return;
    return Object.assign(note, updatedContent);
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
    for (const note of this._notes) {
      if (note.id === id) {
        note.priority = priority;
        return note;
      }
    }
  }

  filterNotesByPriority(priority) {
    return this._notes.filter(e => e.priotity === priority);
  }

  filterNotesByQuery(query) {
    return this._notes.filter(
      ({ title, body }) => title.toLowerCase().includes(query.toLowerCase())
        || body.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
