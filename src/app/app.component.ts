import { Component } from '@angular/core';
import { Config } from '@forgerock/javascript-sdk'
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-todo-prototype';

  ngOnInit(): void {
    Config.set({
      clientId: environment.WEB_OAUTH_CLIENT, // e.g. 'ForgeRockSDKClient'
      redirectUri: environment.APP_URL, // e.g. 'https://sdkapp.example.com:8443/_callback'
      scope: "openid profile", // e.g. 'openid profile me.read'
      serverConfig: {
        baseUrl: environment.AM_URL, // e.g. 'https://openam.example.com:9443/openam/'
        timeout: 30000, // 90000 or less
      },
      realmPath: environment.REALM_PATH, // e.g. 'root'
      tree: environment.JOURNEY_LOGIN, // e.g. 'Login'
    });
  }
}
