/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import TodoComponentsPage, { TodoDeleteDialog } from './todo.page-object';
import TodoUpdatePage from './todo-update.page-object';
import TodoDetailsPage from './todo-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden,
} from '../../util/utils';

const expect = chai.expect;

describe('Todo e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: TodoUpdatePage;
  let detailsPage: TodoDetailsPage;
  let listPage: TodoComponentsPage;
  /*let deleteDialog: TodoDeleteDialog;*/
  let beforeRecordsCount = 0;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login(username, password);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Todos', async () => {
    await navBarPage.getEntityPage('todo');
    listPage = new TodoComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Todo page', async () => {
      await listPage.createButton.click();
      updatePage = new TodoUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/todovueApp.todo.home.createOrEditLabel/);
    });

    /* it('should create and save Todos', async () => {

      await updatePage.titleInput.sendKeys('title');
      expect(await updatePage.titleInput.getAttribute('value')).to.match(/title/);


      const selectedDone = await updatePage.doneInput.isSelected();
      if (selectedDone) {
        await updatePage.doneInput.click();
        expect(await updatePage.doneInput.isSelected()).to.be.false;
      } else {
        await updatePage.doneInput.click();
        expect(await updatePage.doneInput.isSelected()).to.be.true;
      }

      // await selectLastOption(updatePage.userSelect);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });*/

    /*
    describe('Details, Update, Delete flow', () => {

      after(async () => {

        const deleteButton = listPage.getDeleteButton(listPage.records.first());
        await click(deleteButton);

        deleteDialog = new TodoDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/todovueApp.todo.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Todo page and fetch data', async () => {

        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new TodoDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Todo page, fetch data and update', async () => {

        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

          await updatePage.titleInput.clear();
          await updatePage.titleInput.sendKeys('modified');
          expect(await updatePage.titleInput.getAttribute('value')).to.match(/modified/);

          const selectedDone = await updatePage.doneInput.isSelected();
          if (selectedDone) {
            await updatePage.doneInput.click();
            expect(await updatePage.doneInput.isSelected()).to.be.false;
          } else {
            await updatePage.doneInput.click();
            expect(await updatePage.doneInput.isSelected()).to.be.true;
          }


        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
    */
  });
});
