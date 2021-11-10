import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo?: Todo
  @Output() complete = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    
  }

  setComplete(todo: Todo): void {
    this.complete.emit(todo);
  }

  setEdit(todo: Todo): void {
    this.edit.emit(todo);
  }

  setDelete(todo: Todo): void {
    this.delete.emit(todo);
  }
}
