import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Todo = () => import('@/entities/todo/todo.vue');
// prettier-ignore
const TodoUpdate = () => import('@/entities/todo/todo-update.vue');
// prettier-ignore
const TodoDetails = () => import('@/entities/todo/todo-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/todo/new',
    name: 'TodoCreate',
    component: TodoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/todo/:todoId/edit',
    name: 'TodoEdit',
    component: TodoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/todo/:todoId/view',
    name: 'TodoView',
    component: TodoDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
