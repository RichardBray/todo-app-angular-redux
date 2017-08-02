import { Todo } from './todo';
import { Component } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TodoDataService]
})
export class AppComponent {
  newTodo: Todo = new Todo();

  constructor(
    private _store: Store<any>,
    private _todoDataService: TodoDataService
  ) {}

  addTodo(): void {
    this._todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo): void {
    this._todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo): void {
    this._todoDataService.deleteTodoById(todo.id);
  }

  allTodos(): number {
    return this.incompleteTodos.length + this.completeTodos.length;
  }
  get incompleteTodos(): Array<Todo> {
    return this._todoDataService.getIncompleteTodos();
  }

  get completeTodos(): Array<Todo> {
    return this._todoDataService.getCompleteTodos();
  }
}
