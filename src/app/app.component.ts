import { Component } from '@angular/core';
import { Config, UserManager } from '@forgerock/javascript-sdk'
import { environment } from '../environments/environment';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-todo-prototype';

  constructor(public userService: UserService) { }

  async ngOnInit(): Promise<void> {
    Config.set({
      clientId: environment.WEB_OAUTH_CLIENT,
      redirectUri: environment.APP_URL,
      scope: "openid profile email",
      serverConfig: {
        baseUrl: environment.AM_URL,
        timeout: 30000, // 90000 or less
      },
      realmPath: environment.REALM_PATH,
      tree: environment.JOURNEY_LOGIN
    });

    try {
      // Assume user is likely authenticated if there are tokens
      let info = await UserManager.getCurrentUser();
      this.userService.isAuthenticated = true;
      this.userService.info = info;
    } catch (err) {
      // User likely not authenticated
      console.log(err);
    }
  }
}
