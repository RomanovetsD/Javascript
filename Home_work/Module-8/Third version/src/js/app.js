'use strict';

const PRIORITY_TYPES = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

class Notepad {
  constructor (initialNotes) {
  this._notes = initialNotes;
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

  createButton(iconText, noteAction) {
    const btn = document.createElement('button');
    const icon = document.createElement('i');
    btn.classList.add('action');
    icon.classList.add('material-icons', 'action__icon');
    btn.setAttribute('data-action', `${noteAction}`);
    icon.textContent = `${iconText}`;
    btn.append(icon);
    return btn;
    };
  
  createListItem(note) {
  const listItem = document.createElement('li');
  const noteWrap = document.createElement('div');
  const noteContent = this.createNoteContent(note);
  const footer = this.createNoteFooter(note);

  noteWrap.classList.add('note');
  listItem.classList.add('note-list__item');

  listItem.setAttribute('data-id', note.id);
  listItem.setAttribute('data-id', note.id);

  listItem.append(noteWrap);  
  noteWrap.append(noteContent);
  noteWrap.append(footer);
    
  return listItem;
  };

  createNoteContent(note) {
  const noteContent = document.createElement('div');
  const noteTitle = document.createElement('h2');
  const noteBody = document.createElement('p');

  noteContent.classList.add('note__content');
  noteTitle.classList.add('note__title');
  noteBody.classList.add('note__body');

  noteTitle.textContent = `${note.title}`;
  noteBody.textContent = `${note.body}`;

  noteContent.append(noteTitle);
  noteContent.append(noteBody);
  
  return noteContent;

  };

  createNoteFooter(note) {
  const footer = document.createElement('footer');
  const noteSection = document.createElement('section');
  const btnDecrease = this.createButton(ICON_TYPES.ARROW_DOWN, NOTE_ACTIONS.DECREASE_PRIORITY);
  const btnIncrease = this.createButton(ICON_TYPES.ARROW_UP, NOTE_ACTIONS.INCREASE_PRIORITY);
  const notePriority = document.createElement('span');
  const noteSectionEdit = document.createElement('section');
  const btnEdit = this.createButton(ICON_TYPES.EDIT, NOTE_ACTIONS.EDIT);
  const btnDelete = this.createButton(ICON_TYPES.DELETE, NOTE_ACTIONS.DELETE);
  
  footer.classList.add('note__footer');
  noteSection.classList.add('note__section');
  notePriority.classList.add('note__priority');
  noteSectionEdit.classList.add('note__section');
 
  notePriority.textContent = `Priority: ${note.priority}`;
  
  footer.append(noteSection);
  noteSection.append(btnDecrease);
  noteSection.append(btnIncrease);    
  noteSection.append(notePriority);
  footer.append(noteSectionEdit);
  noteSectionEdit.append(btnEdit);
  noteSectionEdit.append(btnDelete); 

  return footer;

  };

  
  renderNoteList(listRef, notes) {
  const result = notes.map(note => this.createListItem(note));
  listRef.append(...result);
  };
}

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

const notepad = new Notepad(initialNotes);

const noteItem = notepad.renderNoteList(document.querySelector('.note-list'), notepad.notes);