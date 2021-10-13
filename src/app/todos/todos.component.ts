import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: Todo = { _id: "", title: "", completed: false };

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.resetNewTodo();
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().then(response => {
      response.json().then(json => {
        this.todos = json as Todo[];
      })
    });
  }

  createTodo(): void {
    this.todoService.createTodo(this.newTodo).then(response => {
      this.resetNewTodo();

      response.json().then((json) => {
        this.getTodos();
      });
    });
  }

  completeTodo(todo: Todo): void {
    this.todoService.completeTodo(todo).then(response => {
      response.json().then((json) => {
        this.getTodos();
      });
    });
  }

  resetNewTodo(): void {
    this.newTodo = { _id: "", title: "", completed: false };
  }
}
