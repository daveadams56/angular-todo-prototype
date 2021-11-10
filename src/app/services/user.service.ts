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

    UserManager.getCurrentUser().then((info) => {
      // Assume user is likely authenticated if there are tokens
      this.isAuthenticated = true;
      this.info = info;
    }).catch(error => {
      // User likely has stale tokens; log them out
      console.log(error);
    });

    // TokenManager.getTokens().then(tokens => {
    //   // Assume user is likely authenticated if there are tokens
    //   this.isAuthenticated = true;

    //   UserManager.getCurrentUser().then((info) => {
    //     this.info = info;
    //   }).catch(error => {
    //     // User likely has stale tokens; log them out
    //     FRUser.logout();
    //   });
    // }).catch(error => {
    //   // User is probably not authenticated
    //   FRUser.logout();
    // })
  }
}
