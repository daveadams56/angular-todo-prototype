import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { UserManager } from '@forgerock/javascript-sdk';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    if (this.userService.isAuthenticated) {
      return true;
    } else {
      try {
        // Assume user is likely authenticated if there are tokens
        let info = await UserManager.getCurrentUser();
        this.userService.isAuthenticated = true;
        this.userService.info = info;
        return true;
      } catch (err) {
        // User likely not authenticated
        console.log(err);
        return this.router.parseUrl('/login');
      }
    }
  }
}
