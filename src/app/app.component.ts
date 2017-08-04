import { Todo } from './todo';
import { Component } from '@angular/core';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TodoDataService]
})
export class AppComponent {
  public newTodo: Todo = new Todo();

  constructor(private _todoDataService: TodoDataService) {}

  public addTodo(): void {
    this._todoDataService.addTodo(this.newTodo);
  }

  public toggleTodoComplete({ id }): void {
    this._todoDataService.toggleTodoComplete(id);
  }

  public removeTodo({ id }): void {
    this._todoDataService.deleteTodoById(id);
  }

  public allTodos(): number {
    return this.incompleteTodos.length + this.completeTodos.length;
  }

  public get incompleteTodos(): Array<Todo> {
    return this._todoDataService.getIncompleteTodos();
  }

  public get completeTodos(): Array<Todo> {
    return this._todoDataService.getCompleteTodos();
  }
}
