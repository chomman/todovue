import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import UserService from '@/admin/user-management/user-management.service';

import { ITodo, Todo } from '@/shared/model/todo.model';
import TodoService from './todo.service';

const validations: any = {
  todo: {
    title: {
      required,
    },
    done: {},
    user: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TodoUpdate extends Vue {
  @Inject('todoService') private todoService: () => TodoService;
  public todo: ITodo = new Todo();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todoId) {
        vm.retrieveTodo(to.params.todoId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.todo.id) {
      this.todoService()
        .update(this.todo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todovueApp.todo.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.todoService()
        .create(this.todo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todovueApp.todo.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public retrieveTodo(todoId): void {
    this.todoService()
      .find(todoId)
      .then(res => {
        this.todo = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
