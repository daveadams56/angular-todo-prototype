import { Component, OnInit } from '@angular/core';
import { HttpClient, TokenManager, TokenStorage } from '@forgerock/javascript-sdk';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
})
export class SubscriptionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  async subscribe(): Promise<void> {
    try {
      //const tokens = await TokenManager.getTokens();
      let idToken = (await TokenStorage.get()).idToken;
      console.log(idToken);

      if (!idToken) {
        idToken = '';
      }

      const res = await HttpClient.request({
        url: `${environment.API_URL}/subscription`,
        init: {
          headers: {
            'Content-Type': 'application/json',
            idtoken: idToken,
          },
          method: 'POST',
        },
        timeout: 5000,
      });

      //console.log(res.url)
    } catch (e) {
      console.log('error: ' + e);
    }
  }
}
