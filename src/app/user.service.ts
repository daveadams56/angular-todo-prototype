import { Injectable } from '@angular/core';
import { TokenManager, UserManager, TokenStorage, FRUser } from '@forgerock/javascript-sdk';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated: boolean = false;
  info?: any;

  constructor() { }

  refreshUserAuthentication(): void {
    TokenStorage.get().then(tokens => {
      // Assume user is likely authenticated if there are tokens
      this.isAuthenticated = true;

      console.log("user authenticated")
      UserManager.getCurrentUser().then((info) => {
        this.info = info;
        console.log(info);
      }).catch(error => {
        // User likely has stale tokens; log them out
        FRUser.logout();
      });
    }).catch(error => {
      // User is probably not authenticated
      console.log("user not authenticated: " + error)
    })
  }
}
