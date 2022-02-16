<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="todovueApp.todo.home.createOrEditLabel"
          data-cy="TodoCreateUpdateHeading"
          v-text="$t('todovueApp.todo.home.createOrEditLabel')"
        >
          Create or edit a Todo
        </h2>
        <div>
          <div class="form-group" v-if="todo.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="todo.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('todovueApp.todo.title')" for="todo-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="todo-title"
              data-cy="title"
              :class="{ valid: !$v.todo.title.$invalid, invalid: $v.todo.title.$invalid }"
              v-model="$v.todo.title.$model"
              required
            />
            <div v-if="$v.todo.title.$anyDirty && $v.todo.title.$invalid">
              <small class="form-text text-danger" v-if="!$v.todo.title.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('todovueApp.todo.done')" for="todo-done">Done</label>
            <input
              type="checkbox"
              class="form-check"
              name="done"
              id="todo-done"
              data-cy="done"
              :class="{ valid: !$v.todo.done.$invalid, invalid: $v.todo.done.$invalid }"
              v-model="$v.todo.done.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('todovueApp.todo.user')" for="todo-user">User</label>
            <select class="form-control" id="todo-user" data-cy="user" name="user" v-model="todo.user" required>
              <option v-if="!todo.user" v-bind:value="null" selected></option>
              <option
                v-bind:value="todo.user && userOption.id === todo.user.id ? todo.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
              </option>
            </select>
          </div>
          <div v-if="$v.todo.user.$anyDirty && $v.todo.user.$invalid">
            <small class="form-text text-danger" v-if="!$v.todo.user.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.todo.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./todo-update.component.ts"></script>
