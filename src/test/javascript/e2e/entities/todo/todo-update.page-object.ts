import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class TodoUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('todovueApp.todo.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  titleInput: ElementFinder = element(by.css('input#todo-title'));

  doneInput: ElementFinder = element(by.css('input#todo-done'));
  userSelect = element(by.css('select#todo-user'));
}
