export default {
  list: document.querySelector(".note-list"),
  openEditor: document.querySelector('button[data-action="open-editor"]'),
  editorSave: document.querySelector('.modal__btn[type="submit"]'),
  title: document.querySelector('input[name="note_title"]'),
  body: document.querySelector('textarea[name="note_body"]'),
  search: document.querySelector(".search-form__input"),
  template: document.querySelector("#list-template"),
};
