/*
 * angular-todo-prototype
 *
 * todo.service.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Injectable } from '@angular/core';
import { Todo } from '../features/todo/todo';
import { environment } from '../../environments/environment';
import { HttpClient } from '@forgerock/javascript-sdk';

/**
 * Used to define interactions with the backend
 */
@Injectable({
  providedIn: 'root',
})
export class TodoService {

  /**
   * Send a request to retrieve all Todos for the current user
   * @returns Promise - Response from the GET request
   */
  getTodos(): Promise<Response> {
    return HttpClient.request({
      url: `${environment.API_URL}/todos`,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
      timeout: 5000,
    });
  }

  /**
   * Send a request to create a new Todo for the current user
   * @param todo - The Todo to be created
   * @returns Promise - Response from the POST request
   */
  createTodo(todo: Todo): Promise<Response> {
    return HttpClient.request({
      url: `${environment.API_URL}/todos`,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
        method: 'POST',
      },
      timeout: 5000,
    });
  }

  /**
   * Send a request to mark a given Todo as complete
   * @param todo - The Todo to be marked as completed
   * @returns Promise - Response from the POST request
   */
  completeTodo(todo: Todo): Promise<Response> {
    todo.completed = !todo.completed;

    return HttpClient.request({
      url: `${environment.API_URL}/todos/${todo._id}`,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
        method: 'POST',
      },
      timeout: 5000,
    });
  }

  /**
   * Send a request to update a given Todo
   * @param todo - The Todo to be updated
   * @returns Promise - Response from the POST request
   */
  updateTodo(todo: Todo): Promise<Response> {
    return HttpClient.request({
      url: `${environment.API_URL}/todos/${todo._id}`,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
        method: 'POST',
      },
      timeout: 5000,
    });
  }

  /**
   * Send a request to delete a given Todo
   * @param todo - The Todo to be deleted
   * @returns Promise - Response from the DELETE request
   */
  deleteTodo(todo: Todo): Promise<Response> {
    return HttpClient.request({
      url: `${environment.API_URL}/todos/${todo._id}`,
      init: {
        method: 'DELETE',
      },
      timeout: 5000,
    });
  }
}
