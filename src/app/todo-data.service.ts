import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoDataService {

  public lastId: number = 0;
  public todos: Todo[] = [];

  constructor(private _store: Store<any>) {
    _store.select('people').subscribe(todos => {
      this.todos = todos;
    });
  }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataService {
    if(!todo.id) {
      todo.id = ++this.lastId;
    }
    this._store.dispatch({type: 'ADD_TODO', payload: {
      id : ++this.lastId,
      title: todo.title,
      complete: todo.complete
    }});
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getCompleteTodos(): Todo[] {
    return this.todos.filter(todo => todo.complete === true);
  }

  getIncompleteTodos(): Todo[] {
    return this.todos.filter(todo => todo.complete === false);
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }
}
