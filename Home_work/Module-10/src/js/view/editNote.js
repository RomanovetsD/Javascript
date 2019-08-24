import { notepad } from '../app';

function editNote(event) {
  event.preventDefault();
  const { target } = event;
  if (
    target.dataset.action === 'edit-note'
    || target.parentNode.dataset.action === 'edit-note'
  ) {
    const li = target.closest('.note-list__item');
    const noteId = target.closest('.note');
    const { id } = noteId.dataset;
    const note = notepad.findNoteById(id);
    const title = li.querySelector('.note__title');
    const body = li.querySelector('.note__body');

    li.classList.toggle('active');

    if (li.classList.contains('active')) {
      title.setAttribute('contenteditable', true);
      body.setAttribute('contenteditable', true);
      title.style.backgroundColor = 'greenyellow';
      body.style.backgroundColor = 'greenyellow';
      title.style.color = 'black';
      body.style.color = 'black';
      target.style.backgroundColor = 'greenyellow';
      target.style.borderRadius = '25px';
      note.title = title.textContent;
      note.body = body.textContent;
    } else {
      title.setAttribute('contenteditable', false);
      body.setAttribute('contenteditable', false);
      title.style.backgroundColor = 'white';
      body.style.backgroundColor = 'white';
      target.style.backgroundColor = '#7c7879';
      target.style.borderRadius = '25px';
      note.title = title.textContent;
      note.body = body.textContent;
    }
  }
}

export default editNote;
