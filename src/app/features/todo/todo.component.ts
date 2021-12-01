import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent {

  @Input() todo?: Todo
  @Output() completed = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  setComplete(todo: Todo): void {
    this.completed.emit(todo);
  }

  setEdit(todo: Todo): void {
    this.edit.emit(todo);
  }

  setDelete(todo: Todo): void {
    this.delete.emit(todo);
  }
}
