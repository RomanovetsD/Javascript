export default {
  list: document.querySelector('.note-list'),
  form: document.querySelector('.note-editor'),
  title: document.querySelector('input[name="note_title"]'),
  body: document.querySelector('textarea[name="note_body"]'),
  search: document.querySelector('.search-form__input'),
  openEditor: document.querySelector('button[data-action="open-editor"]'),
  saveEditor: document.querySelector('.modal__btn[type="submit"]'),
  template: document.querySelector('#list-template'),
};
