

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

/* function create Note Button */
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

/* function create Note ListItem */
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
  noteSectionLeft.append(createButton(NOTE_ACTIONS.DESCREASE_PRIORITY, ICON_TYPES.ARROW_DOWN));
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

function renderNoteList(listRef, notes) {
  const elem = listRef.cloneNode(false);
  elem.append(...notes.map(e => createListItem(e)));
  listRef.replaceWith(elem);
}

const notepad = new Notepad(initialNotes);
const listRef = document.querySelector('.note-list');
renderNoteList(listRef, notepad.notes);
