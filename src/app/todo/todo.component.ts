import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo?: Todo
  @Output() updated = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    
  }

  completeTodo(todo: Todo): void {
    this.todoService.completeTodo(todo).then(response => {
      response.json().then((json) => {
        this.updated.emit(todo);
      });
    });
  }
}
