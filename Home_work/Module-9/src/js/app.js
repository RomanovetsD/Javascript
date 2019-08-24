'use strict';

class Notepad {

  static generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

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
    if (note.priority) {
      this._notes.push(note);
    } else {
      note.priority = PRIORITY_TYPES.LOW;
      this._notes.push(note);
    }
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
    return this._notes.filter(note => note.body.toLowerCase().includes(query.toLowerCase()));
  };
}

// Constants
const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
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

// References
const refs = {
  list: document.querySelector('.note-list'),
  form: document.querySelector('.note-editor'),
  title: document.querySelector('input[name="note_title"]'),
  body: document.querySelector('textarea[name="note_body"]'),
  search: document.querySelector('.search-form__input')
};


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

// Function 
function createButton(action, text) {
  const button = document.createElement('button');
  button.classList.add('action');
  button.dataset.action = action;

  const icon = document.createElement('i');
  icon.classList.add('material-icons', 'action__icon');
  icon.textContent = text;
  button.appendChild(icon);

  return button;
}

function createListItem({
  id, title, body, priority,
}) {
  const li = document.createElement('li');
  li.classList.add('note-list__item');
  const note = document.createElement('div');
  note.classList.add('note');
  note.dataset.id = id;
  li.append(note);

  /* Note content */
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;
  noteContent.appendChild(noteTitle);

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;
  noteContent.appendChild(noteBody);
  note.appendChild(noteContent);

  /* Note content */
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const noteSectionLeft = document.createElement('section');
  noteSectionLeft.classList.add('note__section');

  const noteSectionRight = document.createElement('section');
  noteSectionRight.classList.add('note__section');

  /* Left Note section */
  noteSectionLeft.append(createButton(NOTE_ACTIONS.DECREASE_PRIORITY, ICON_TYPES.ARROW_DOWN));
  noteSectionLeft.append(createButton(NOTE_ACTIONS.INCREASE_PRIORITY, ICON_TYPES.ARROW_UP));

  const noteSpan = document.createElement('span');
  noteSpan.classList.add('note__priority');
  noteSpan.textContent = `Priority: ${priority}`;
  noteSectionLeft.appendChild(noteSpan);

  /* Right Note section */
  noteSectionRight.append(createButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT));
  noteSectionRight.append(createButton(NOTE_ACTIONS.DELETE, ICON_TYPES.DELETE));

  /* Add footer to html document */
  noteFooter.append(noteSectionLeft);
  noteFooter.append(noteSectionRight);
  note.append(noteFooter);

  return li;
}

function addListItem (ref, note) {
  ref.append(createListItem(note));
}

function renderNoteList(listRef, notes) {
  listRef.innerHTML = '';
  listRef.append(...notes.map(e => createListItem(e)));
}

function addNote(e) {
  e.preventDefault();
  const title = refs.title.value;
  const body = refs.body.value;
    if (title.length === 0 || body.length === 0) {
    alert('Необходимо заполнить все поля!')
    return
  }
  const note = {
    id: Notepad.generateUniqueId(), title, body,
  };
  
  notepad.saveNote(note);
  e.target.reset();
  addListItem(refs.list, note);
}

function deleteNote({target}) {
  const action = target.parentElement.dataset.action;
  if (action !== NOTE_ACTIONS.DELETE) {
    return;
  }
  const parentListItem = target.closest('.note-list__item');
  const id = parentListItem.dataset.id;

  notepad.deleteNote(id);
  parentListItem.remove();
}
 
function filteredItems(e) {
const filterItems = notepad.filterNotesByQuery(e.target.value);
renderNoteList(refs.list, filterItems);
} 

function addNote(e) {
  e.preventDefault();
  const title = refs.title.value;
  const body = refs.body.value;
  if (title.length === 0 || body.length === 0) {
    alert('Необходимо заполнить все поля!');
    return;
  }
  const note = {
    id: Notepad.generateUniqueId(),
    title,
    body,
  };

  notepad.saveNote(note);
  e.target.reset();
  addListItem(refs.list, note);
}

function changePriority({ target }) {
  const action = target.parentElement.dataset.action;
  if (action !== NOTE_ACTIONS.INCREASE_PRIORITY && action !== NOTE_ACTIONS.DECREASE_PRIORITY) {
    return;
  }
  const noteId = target.closest('.note');
  const { id } = noteId.dataset;
  const note = notepad.findNoteById(id);
  
  if (action === NOTE_ACTIONS.DECREASE_PRIORITY && note.priority > 0) {
    note.priority = note.priority - 1;
    noteRefresh();
  }

  if (action === NOTE_ACTIONS.INCREASE_PRIORITY && note.priority < 2) {
    note.priority = note.priority + 1;
    noteRefresh();
  }
}

function noteRefresh() {
  refs.list.innerHTML = '';
  renderNoteList(refs.list, notepad.notes);
}



function editNote(event) {
  event.preventDefault();
  const { target } = event;
  const li = target.closest('.note-list__item');
  const noteId = target.closest('.note');
  const { id } = noteId.dataset;
  const note = notepad.findNoteById(id);
  const title = li.querySelector('.note__title');
  const body = li.querySelector('.note__body');

  if (target.dataset.action === 'edit-note'|| target.parentNode.dataset.action === 'edit-note') {
	
	title.setAttribute('contenteditable', true);
    body.setAttribute('contenteditable', true);
	title.style.backgroundColor = 'greenyellow';
    body.style.backgroundColor = 'greenyellow';
    target.style.backgroundColor = 'greenyellow';
    target.style.borderRadius = '25px';
    note.title = title.textContent;
	note.body = body.textContent; 
	}
}


function saveEditNote(event) {
  event.preventDefault();
  const { target } = event;
  const li = target.closest('.note-list__item');
  const noteId = target.closest('.note');
  const { id } = noteId.dataset;
  const note = notepad.findNoteById(id);
  const title = li.querySelector('.note__title');
  const body = li.querySelector('.note__body');

  if (
    target.dataset.action === 'edit-note'
    || target.parentNode.dataset.action === 'edit-note'
  ) {
    title.setAttribute('contenteditable', false);
    body.setAttribute('contenteditable', false);
	title.style.backgroundColor = 'white';
    body.style.backgroundColor = 'white';
    target.style.backgroundColor = 'black';
    target.style.borderRadius = '25px';
    note.title = title.textContent;
    note.body = body.textContent;
	
  }
}

// Events
refs.form.addEventListener('submit', addNote);
refs.list.addEventListener('click', deleteNote);
refs.search.addEventListener('input', filteredItems);
refs.list.addEventListener('click', changePriority);
refs.list.addEventListener('click', editNote);
refs.list.addEventListener('dblclick', saveEditNote);



const notepad = new Notepad(initialNotes);
renderNoteList(refs.list, notepad.notes);