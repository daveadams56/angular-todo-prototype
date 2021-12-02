/*
 * angular-todo-prototype
 *
 * todos.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit } from '@angular/core';
import { Todo } from '../../features/todo/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { _id: '', title: '', completed: false };
  editTodo?: Todo;
  deleteTodo?: Todo;

  constructor(private todoService: TodoService) {}

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
    this.newTodo = { _id: '', title: '', completed: false };
    this.getTodos();
  }

  async getTodos(): Promise<void> {
    try {
      let todos = await this.todoService.getTodos();
      let json = await todos.json();
      this.todos = json as Todo[];
    } catch (err) {
      console.log(err);
    }
  }

  async create(todo: Todo): Promise<void> {
    try {
      await this.todoService.createTodo(todo);
      this.resetTodos();
    } catch (err) {
      console.log(err);
    }
  }

  async complete(todo: Todo): Promise<void> {
    try {
      await this.todoService.completeTodo(todo);
      this.resetTodos();
    } catch (err) {
      console.log(err);
    }
  }

  async update(todo: Todo): Promise<void> {
    try {
      await this.todoService.updateTodo(todo);
      this.resetTodos();
    } catch (err) {
      console.log(err);
    }
  }

  async delete(todo: Todo): Promise<void> {
    try {
      await this.todoService.deleteTodo(todo);
      this.resetTodos();
    } catch (err) {
      console.log(err);
    }
  }
}
