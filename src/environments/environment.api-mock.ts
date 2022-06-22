// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: 'api-mock',
  baseUrl: 'http://172.16.1.244:4001/facthos-core/api/v1/checkin',
  // Microsoft authentication login settings
  clientId: '10fa89b3-ed10-4bcb-a4e1-593769a7014f',
  redirectUri: 'http://localhost:4200/check-in',
  postLogoutRedirectUri: "http://localhost:4200",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
