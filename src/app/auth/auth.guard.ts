/*
 * angular-todo-prototype
 *
 * auth.guard.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

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

  /**
   * Extends CanActivate to protect selected routes from unauthenticated access
   *
   * @param next - Route that the user is trying to access
   * @param state - Router state
   * @returns Promise - Boolean or route to redirect the user to
   */
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    if (this.userService.isAuthenticated) {
      return true;
    } else {
      try {
        // Assume user is likely authenticated if there are tokens

        /** *****************************************************************
         * SDK INTEGRATION POINT
         * Summary: Optional client-side route access validation
         * ------------------------------------------------------------------
         * Details: Here, you could just make sure tokens exist –
         * TokenStorage.get() – or, validate tokens, renew expiry timers,
         * session checks ... Below, we are calling the userinfo endpoint to
         * ensure valid tokens before continuing, but it's optional.
         ***************************************************************** */
        const info = await UserManager.getCurrentUser();
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
