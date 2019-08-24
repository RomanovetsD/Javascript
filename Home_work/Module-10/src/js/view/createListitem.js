// Function
import { NOTE_ACTIONS, ICON_TYPES } from '../utils/constants';

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

export default createListItem;
