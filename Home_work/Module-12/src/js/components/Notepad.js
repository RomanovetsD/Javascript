
class Notepad {
  constructor(arr) {
    this._notes = arr;
  }

  get notes() {
    return this._notes;
  }

  pushToLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  findNoteById(id) {
    const note = this._notes.find(item => item.id === id);
    return note;
  }

  saveNote(note){
  this._notes.push(note);
  this.pushToLocalStorage();
}

deleteNote(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this._notes = this._notes.filter(note => note.id !== id);
      resolve(this._notes);
      this.pushToLocalStorage();
      reject('Error');
    }, 500);
  });
}

updateNoteContent(id, updatedContent) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = Object.assign(this.findNoteById(id), updatedContent);
      this.pushToLocalStorage();
      resolve(result);
    }, 300);
  });
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
        this.pushToLocalStorage();
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
