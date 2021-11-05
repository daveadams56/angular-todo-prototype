import { Injectable } from '@angular/core';
import { Todo } from '../todo';
import { environment } from '../../environments/environment';
import { HttpClient } from '@forgerock/javascript-sdk';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Promise<Response> {
    return HttpClient.request({
      url: `${environment.API_URL}/todos`,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "GET"
      },
      timeout: 5000
    });
  }

  createTodo(todo: Todo): Promise<Response> {
    return HttpClient.request({
      url: `${environment.API_URL}/todos`,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
        method: "POST"
      },
      timeout: 5000
    });
  }

  completeTodo(todo: Todo): Promise<Response> {
    todo.completed = !todo.completed;

    return HttpClient.request({
      url: `${environment.API_URL}/todos/${todo._id}`,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
        method: "POST"
      },
      timeout: 5000
    });
  }

}
