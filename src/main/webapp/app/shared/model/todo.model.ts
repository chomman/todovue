import { IUser } from '@/shared/model/user.model';

export interface ITodo {
  id?: number;
  title?: string;
  done?: boolean | null;
  user?: IUser;
}

export class Todo implements ITodo {
  constructor(public id?: number, public title?: string, public done?: boolean | null, public user?: IUser) {
    this.done = this.done ?? false;
  }
}
