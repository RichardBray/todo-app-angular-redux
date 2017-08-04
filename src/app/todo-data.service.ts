import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoDataService {
  public lastId: number = 0;
  public todos: Todo[] = [];

  constructor(private _store: Store<any>) {
    // To gain access to todos in the store put the 'todos' reducer
    // assign todos that we get to our local todos variable
    // unless todo is updated don;t emit a new value
    _store.select('todos').subscribe(todos => {
      this.todos = todos;
    });
  }

  public addTodo(todo: Todo): void {
    this._store.dispatch({
      type: 'ADD_TODO',
      payload: {
        id: ++this.lastId,
        title: todo.title,
        complete: todo.complete
      }
    });
  }

  public deleteTodoById(todoId: number): void {
    this._store.dispatch({
      type: 'REMOVE_TODO',
      payload: { id: todoId }
    });
  }

  public toggleTodoComplete(todoId: number): void {
    this._store.dispatch({
      type: 'TOGGLE_COMPLETE',
      payload: {
        id: todoId
      }
    });
  }

  public getCompleteTodos(): Todo[] {
    return this.todos.filter(todo => todo.complete === true);
  }

  public getIncompleteTodos(): Todo[] {
    return this.todos.filter(todo => todo.complete === false);
  }
}
