// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// TODO replace with process.env variables
export const environment = {
  production: false,
  AM_URL: "https://openam-david-sdk.forgeblocks.com/am",
  REALM_PATH: "alpha",
  WEB_OAUTH_CLIENT: "WebOAuthClient",
  JOURNEY_LOGIN: "Login",
  JOURNEY_REGISTER: "Registration",
  API_URL: "https://api.example.com:9443",
  APP_URL: "https://app.example.com:8443"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
