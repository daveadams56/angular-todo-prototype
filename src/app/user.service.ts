import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated: boolean = false;
  info?: any;

  constructor() { }
}
