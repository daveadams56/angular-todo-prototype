import { Component, OnInit } from '@angular/core';
import { Todo } from '../../todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: Todo = { _id: "", title: "", completed: false };
  editTodo?: Todo;
  deleteTodo?: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  setEditTodo(todo: Todo): void {
    this.editTodo = todo;
  }

  setDeleteTodo(todo: Todo): void {
    this.deleteTodo = todo;
  }

  resetTodos(): void {
    this.editTodo = undefined;
    this.deleteTodo = undefined;
    this.newTodo = { _id: "", title: "", completed: false };
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().then(response => {
      response.json().then(json => {
        this.todos = json as Todo[];
      })
    });
  }

  create(todo: Todo): void {
    this.todoService.createTodo(todo).then(response => {
      response.json().then((json) => {
        this.resetTodos();
      });
    });
  }

  complete(todo: Todo): void {
    this.todoService.completeTodo(todo).then(response => {
      response.json().then((json) => {
        this.resetTodos();
      });
    });
  }

  update(todo: Todo): void {
    this.todoService.updateTodo(todo).then(response => {
      response.json().then((json) => {
        this.resetTodos();
      });
    });
  }

  delete(todo: Todo): void {
    this.todoService.deleteTodo(todo).then(response => {
      this.resetTodos();
    });
  }
}
