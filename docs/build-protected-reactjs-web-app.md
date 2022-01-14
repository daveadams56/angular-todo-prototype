---
title: 'Build a Protected Angular Web App'
category: Blog
category-order: 7
order: 1
excluded_in_navigation: true
excluded_in_search: false
---

Development tutorial with a sample Angular SPA and Node.js REST API.

## Table of contents

- [What is a protected web app?](#what-is-a-protected-web-app)
- [What you will learn](#what-you-will-learn)
  - [This is not a guide on how to build an Angular app](#this-is-not-a-guide-on-how-to-build-an-angular-app)
  - [Using this guide](#using-this-guide)
- [Requirements](#requirements)
  - [Knowledge requirements](#knowledge-requirements)
  - [Technical requirements](#technical-requirements)
- [ForgeRock Setup](#forgerock-setup)
  - [Step 1. Configure CORS (Cross-Origin Resource Sharing)](#step-1-configure-cors-cross-origin-resource-sharing)
  - [Step 2. Create simple login journey/tree](#step-2-create-simple-login-journeytree)
  - [Step 3. Create two OAuth clients](#step-3-create-two-oauth-clients)
  - [Step 4. Create a test user](#step-4-create-a-test-user)
- [Local project setup](#local-project-setup)
  - [Step 1. Installing the project](#step-1-installing-the-project)
  - [Step 2. Create your security certificates](#step-2-create-your-security-certificates)
  - [Step 3. Set local domain aliasing](#step-3-set-local-domain-aliasing)
  - [Step 4. Create the `.env` file](#step-4-create-the-env-file)
- [Build and run the project](#build-and-run-the-project)
- [View the app in browser](#view-the-app-in-browser)
- [Implementing the ForgeRock SDK](#implementing-the-forgerock-sdk)
  - [Step 1. Configure the SDK to your ForgeRock server](#step-1-configure-the-sdk-to-your-forgerock-server)
  - [Step 2. Building the login page](#step-2-building-the-login-page)
  - [Step 3. Handling the login form submission](#step-3-handling-the-login-form-submission)
  - [Step 4. Continuing to the OAuth 2.0 flow](#step-4-continuing-to-the-oauth-20-flow)
  - [Step 5. Request user information](#step-5-request-user-information)
  - [Step 6. Reacting to the presence of the access token](#step-6-reacting-to-the-presence-of-the-access-token)
  - [Step 7. Validating the access token](#step-7-validating-the-access-token)
  - [Step 8. Request protected resources with an access token](#step-8-request-protected-resources-with-an-access-token)
  - [Step 9. Handle logout request](#step-9-handle-logout-request)

## What is a protected web app?

A protected app (client or server) is simply an app that uses some type of access artifact to ensure a user’s identity and permissions prior to giving access to a resource. This “access artifact” can be a session cookie, an access token, or an assertion, and is shared between the entities of a system.

Additionally, a protected _web_ app (client) is responsible for providing a user a method of acquiring, using, and removing this access artifact upon request. This responsibility of managing the artifact is what will be the focus of this guide.

## What you will learn

Angular is a popular, JavaScript web application framework from Google. As with most libraries and frameworks, it recommends or requires particular patterns and conventions for development. Since ForgeRock doesn’t (as of this writing) provide a Angular version of our SDK, we want to present this how-to as a guide through a basic implementation of our core JavaScript SDK using the Angular patterns and conventions commonly prescribed by the community.

This guide uses the ForgeRock JavaScript SDK to implement the following application features:

1. Dynamic authentication form for login
2. OAuth/OIDC token acquisition through the Authorization Code Flow with PKCE
3. Protected client-side routing
4. Resource requests to a protected REST API
5. Logout

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/todos-page-with-todos.png" title="The to-do sample app" caption="Screenshot of the to-do page of the sample app" %}

### This is not a guide on how to build an Angular app

How Angular apps are architected or constructed is outside of the scope of this guide. To simply demonstrate our SDK integration, we will be using a simplified, non-production-ready, to-do app. This to-do app represents a Single Page Application (SPA) created using the Angular CLI with nothing a single module and Angular Router added for routing and redirection.

### Using this guide

This is a “hands on” guide. We are providing the web app and resource server for you. You can find the repo on Github to follow along. All you’ll need is your own ForgeRock Identity Cloud or Access Manager. If you don’t have access to either, and you are interested in ForgeRock’s Identity and Access Management platform, reach out to a representative today, and we’ll be happy to get you started.

#### Two ways of using this guide

1. Follow along by building portions of the app yourself: continue by ensuring you can [meet the requirements](#requirements) below
2. Just curious about the Angular implementation details: skip to [Implementing the ForgeRock SDK](#implementing-the-forgerock-sdk)

## Requirements

### Knowledge requirements

1. JavaScript, TypeScript and the npm ecosystem of modules
2. The command line interface (e.g. Terminal, Shell or Bash)
3. Core Git commands (e.g. `clone`, `checkout`)
4. Angular Modules and Components: we will be using standard Angular concepts consistent with the angular.io tutorials and the CLI
5. Angular Services: local state will be shared and managed using these
6. Angular Router and Auth Guards: our choice of handling “pages”, redirection and protected pages

### Technical requirements

- Admin access to an instance of ForgeRock Identity Cloud or Access Manager (referred to as AM)
- Node.js >= 14 & npm >= 7 (please check your version with `node -v` and `npm -v`)
- A tool or service to generate a security certificate and key (self-signed is fine)

## ForgeRock Setup

### Step 1. Configure CORS (Cross-Origin Resource Sharing)

Due to the fact that pieces of our system will be running on different origins (scheme, domain and port), we will need to configure CORS in the ForgeRock server to allow our web app to make requests. Use the following values:

- **Allowed Origins**: `https://angular.example.com:8443`
- **Allowed Methods**: `GET` `POST`
- **Allowed headers**: `accept-api-version` `authorization` `content-type` `x-requested-with`
- **Allow credentials**: enable

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/cors-configuration.png" title="Example CORS from ForgeRock ID Cloud" caption="Screenshot of CORS configuration within ID Cloud" %}

For more information about CORS configuration, [visit our ForgeRock documentation for CORS on AM](https://backstage.forgerock.com/docs/am/7/security-guide/enable-cors-support.html) or [for CORS configuration on ID Cloud](https://backstage.forgerock.com/docs/idcloud/latest/tenants/configure-cors.html).

### Step 2. Create simple login journey/tree

You will need a simple username and password authentication journey/tree (referred to as "journey") for this guide.

1. Create a Page Node and connect it to the start of the journey
2. Add the Username Collector and Password Collector nodes within the Page Node
3. Add the Data Store Decision node and connect it to the Page Node
4. Connect the `True` outcome of the decision node to the Success node
5. Connect the `False` outcome of the decision node to the Failure node

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/username-password-journey.png" title="Example journey from ForgeRock ID Cloud" caption="Screenshot of username-password journey in ID Cloud" %}

For more information about building journeys/trees, [visit our ForgeRock documentation for tree configuration on AM](https://backstage.forgerock.com/docs/am/7/authentication-guide/about-authentication-trees.html) or [for journey configuration on ID Cloud](https://backstage.forgerock.com/docs/idcloud/latest/realms/journeys.html).

### Step 3. Create two OAuth clients

Within the ForgeRock server, create two OAuth clients: one for the Angular web app, and one for the Node.js resource server.

Why two? It's conventional to have one OAuth client per app in the system. For this case, a public OAuth client for the Angular app will provide our app with OAuth/OIDC tokens. The Node.js server will validate the user's Access Token shared via the Angular app using its own confidential OAuth client.

#### Public (aka "SPA" type) OAuth client settings

- **Client name/ID**: `WebOAuthClient`
- **Client type**: `Public`
- **Secret**: `<leave empty>`
- **Scopes**: `openid` `profile` `email`
- **Grant types**: `Authorization Code`
- **Implicit consent**: enabled
- **Redirection URLs/Sign-in URLs**: `https://angular.example.com:8443/callback`
- **Token authentication endpoint method**: `none`

#### Confidential (aka "Web" type) OAuth client settings

- **Client name/ID**: `RestOAuthClient`
- **Client type**: `Confidential`
- **Secret**: `<alphanumeric string>` (treat it like a password)
- **Default scope**: `am-introspect-all-tokens`
- **Grant types**: `Authorization Code`
- **Token authentication endpoint method**: `client_secret_basic`

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/oauth-client-configuration.png" title="Example OAuth client from ForgeRock ID Cloud" caption="Screenshot of an OAuth client configuration in ID Cloud" %}

For more information about configuring OAuth clients, [visit our ForgeRock documentation for OAuth 2.0 client configuration on AM](https://backstage.forgerock.com/docs/am/7/oauth2-guide/oauth2-register-client.html) or [for OAuth client/application configuration on ID Cloud](https://backstage.forgerock.com/docs/idcloud/latest/realms/applications.html).

### Step 4. Create a test user

Create a simple test user (identity) in your ForgeRock server within the realm you will be using.

If using ForgeRock ID Cloud, [follow our ForgeRock documentation for creating a user in ID Cloud](https://backstage.forgerock.com/docs/idcloud/latest/identities/manage-identities.html#create_a_user_profile).

If you are using ForgeRock’s AM, click on **Identities** item in the left navigation. Use the following instructions to create a user:

1. Click on **Add Identity** to view the create user form
2. In a separate browser tab, [visit this UUID v4 generator copy the UUID](https://www.uuidgenerator.net/version4)
3. Switch back to AM and paste the UUID into the input
4. Provide a password and email address

**Note: You will use this UUID as the username for logging into the Angular app.**

## Local project setup

### Step 1. Installing the project

First, clone the [JavaScript SDK project](https://github.com/ForgeRock/forgerock-javascript-sdk) to your local computer, `cd` (change directory) into the project folder, `checkout` the branch for this guide, and install the needed dependencies:

```bash
git clone https://github.com/ForgeRock/forgerock-javascript-sdk.git
cd forgerock-javascript-sdk
git checkout blog/build-protected-app/start
npm i
```

NOTE: The branch that will be used in this guide will be an overly-simplified version of the sample app you see in the `master` Git branch. There’s also a branch that represents the completion of this guide. If you get stuck, you can visit `blog/build-protected-app/complete` branch in Github.

### Step 2. Create your security certificates

Apps that deal with authentication or authorization require HTTPS (secure protocol), which necessitates the use of security (SSL/TLS) certificates. For local testing and development, it’s common to generate your own self-signed certificates.

You’re free to use any method to do this, but the result should be two files, a certificate and key, within the `samples/angular-todo` directory. If you need assistance in generating your own certs, [`mkcert` can help simplify the process](https://github.com/FiloSottile/mkcert). Or, you can [follow the `openssl` example on this Node.js' page that explains how to generate these files](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/).

After following either method, you should have two files:

1. `<cert-filename>.pem`
2. `<key-filename>.pem`

*Note: Ensure these two files are in the `samples/angular-todo` directory.*

> **Warning: Self-signed certificates or certificates not from an industry-recognized, certificate authority (CA) should never be used in production.**

### Step 3. Set local domain aliasing

Edit your `hosts` file to point special domains to your `localhost` . If you’re on a Mac, the file can be found here: `/etc/hosts`. If you are on Windows, it will be found here (or similar): `System32\Drivers\etc\hosts`. Open the file as an administrator or as `sudo`, and add the following line:

```text
127.0.0.1 angular.example.com api.example.com
```

This allows for easier operation of the app locally and keeps it consistent with how it operates on the Web.

### Step 4. Create the `.env` file

First, open the `samples/angular-todos` directory, and look for the `.env.example` file. Copy this file and save it with the name `.env` within this same directory. Add your relevant values to this new file as it will provide all the important configuration settings to your applications.

Here’s a hypothetical example; your values may vary:

```text
AM_URL=https://auth.forgerock.com/am
APP_URL=https://angular.example.com:8443
API_URL=https://api.example.com:9443
DEBUGGER_OFF=false
DEVELOPMENT=true
JOURNEY_LOGIN=Login
JOURNEY_REGISTER=Registration
SEC_KEY_FILE=key-file.pem
SEC_CERT_FILE=cert-file.pem
REALM_PATH=alpha
REST_OAUTH_CLIENT=RestOAuthClient
REST_OAUTH_SECRET=6MWE8hs46k68g9s7fHOJd2LEfv
WEB_OAUTH_CLIENT=WebOAuthClient
```

Here are descriptions for some of the values:

- `DEBUGGER_OFF`: when `true`, this disables the `debugger` statements in the app. These debugger statements are for learning the integration points at runtime in your browser. When the browser’s developer tools are open, the app will pause at each integration point. Code comments will be placed above them explaining its use.
- `DEVELOPMENT`: when `true`, this provides better debugging during development
- `JOURNEY_LOGIN`: the name of your simple login journey (created above)
- `JOURNEY_REGISTER`: the name of your registration journey (not needed for this guide)
- `REALM_PATH`: the realm of your ForgeRock server (likely `root`, `alpha` or `beta`)

## Build and run the project

Now that everything is setup, build and run the to-do app project. Open two terminal windows and use the following commands at the root directory of the SDK repo:

```bash
npm start
```

The `start` command watches for file changes and rebuilds the project when necessary. You do not need to restart the process unless you do the following:

- Modify your `.env` file
- Modify the `angular.json` file
- Modify any file within the `/server` directory
- Modify either security certificate

## View the app in browser

In a _different_ browser than the one you are using to administer the ForgeRock server, visit the following URL: `https://angular.example.com:8443`. A home page should be rendered explaining the purpose of the project. It should look like the below (it may be dark if you have the dark theme/mode set in your OS):

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/home-page.png" title="To-do app home page" caption="Screenshot of the home page of the sample app" %}

*Note: only the home page will render successfully at this moment. If you click on the login page, it won't be fully functional. This is intended as you will develop this functionality throughout this tutorial.*

If the home page doesn't render due to errors, here are a few tips:

- Visit `https://api.example.com:9443/healthcheck` in the same browser you use for the Angular app; ensure it responds with "OK"
- Ensure your `hosts` file has the correct aliases
- Check the terminal that has the `start` command running for error output
- Ensure you are not logged into the ForgeRock server within the same browser as the sample app; logout from ForgeRock if you are and use a different browser

## Implementing the ForgeRock SDK

### Step 1. Configure the SDK to your ForgeRock server

Now that we have our environment and servers setup, let’s jump into the application! Within your IDE of choice, navigate to the `samples/angular-todo/client` directory. This directory is where you will spend the rest of your time.

First, open up the `src/app/app.component.ts` file, import the `Config` object from the JavaScript SDK and call the `set` function on this object.

To import the `Config` object, add the following code to the top of the file:
```
import { Config, UserManager } from '@forgerock/javascript-sdk';
```

Now configure the SDK using the Set function by adding the following code to the `ngOnInit` function:
```
    /** ***************************************************************************
     * SDK INTEGRATION POINT
     * Summary: Configure the SDK
     * ----------------------------------------------------------------------------
     * Details: Below, you will see the following settings:
     * - clientId: (OAuth2 only) this is the OAuth2 client you created in ForgeRock
     * - redirectUri: (OAuth2 only) this is the URI/URL of this app too which the
     *   OAuth flow will redirect
     * - scope: (OAuth2 only) these are the OAuth scopes that you will request from
     *   ForgeRock
     * - serverConfig: this includes the baseUrl of your ForgeRock AM, should
     *   include `/am/` at the end
     * - realmPath: this is the realm you are wanting to use within ForgeRock
     * - tree: The authentication journey/tree that you are wanting to use
     *************************************************************************** */

    Config.set({
      clientId: environment.WEB_OAUTH_CLIENT,
      redirectUri: environment.APP_URL,
      scope: 'openid profile email',
      serverConfig: {
        baseUrl: environment.AM_URL,
        timeout: 30000, // 90000 or less
      },
      realmPath: environment.REALM_PATH,
      tree: environment.JOURNEY_LOGIN,
    });
```

The use of `set` should always be the first SDK method called and is frequently done at the application’s top-level file. To configure the SDK to communicate with the journeys, OAuth clients, and realms of the appropriate ForgeRock server, pass a configuration object with the appropriate values.

The configuration object you will use in this instance will pull most of its values out of the `.env` variables previously setup, which are mapped to constants within the `environment.ts` file generated when the project is built.

Go back to your browser and refresh the home page. There should be no change to what’s rendered, and no errors in the console. Now that the app is configured to your ForgeRock server, let’s wire up the simple login page!

### Step 2. Building the login page

First, let’s review how the application renders the home page:

`HomeComponent` consisting of `views/home/home.component.html` (HTML template with Angular directives), and `views/home/home.component.ts` (Angular component).

For the login page, the same pattern applies:

`LoginComponent` consisting of `views/home/home.component.html` and `views/home/home.component.ts`. This is a simple view component, which includes `FormComponent` which actually invokes the SDK - more on that shortly.

Navigate to the app’s login page within your browser. You should see a "loading" spinner and message that's persistent since it doesn't have the data needed to render the form. To ensure the correct form is rendered, the initial data needs to be retrieved from the ForgeRock server. That will be the first task.

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/login-page-spinner.png" title="Login page with spinner" caption="Screenshot of to-app's login with spinner" %}

Since most of the action is taking place in `features/journey/form.html` and `features/journey/form.ts`, open both and add the SDK import to `form.ts`:

```
import { FRAuth } from '@forgerock/javascript-sdk';
```
{: .diff-highlight}

`FRAuth` is the first object used as it provides the necessary methods for authenticating a user against the Login **Journey**/**Tree**. Use the `start` method of `FRAuth` as it returns data we need for rendering the form.

As we did earlier, import FRAuth and components that we will need to complete this section:

```
import {
  FRAuth,
  FRLoginFailure,
  FRLoginSuccess,
  FRStep
} from '@forgerock/javascript-sdk';
```

Add the following code to the `nextStep` function to call the start function, initiating the authentication attempt using the SDK:

```
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Call the SDK's next method to submit the current step.
       * ----------------------------------------------------------------------
       * Details: This calls the next method with the previous step, expecting
       * the next step to be returned, or a success or failure.
       ********************************************************************* */
      let nextStep = await FRAuth.next(step, { tree: this.tree });
```
The result of this initial request will be stored in a variable named `nextStep`; we will now need to work out whether this is a login failure, success, or step with instructions for what needs to be rendered to the user for input collection.

To handle these outcomes, add the following code after the code you added above:

```
      /** *******************************************************************
       * SDK INTEGRATION POINT
       * Summary: Handle step based on step type
       * --------------------------------------------------------------------
       * Details: Determine whether the step is a login failure, success or
       * next step in the authentication journey, and handle appropriately.
       ******************************************************************* */
      switch (nextStep.type) {
        case 'LoginFailure':
          this.handleFailure(nextStep);
          break;
        case 'LoginSuccess':
          this.handleSuccess(nextStep);
          break;
        case 'Step':
          this.handleStep(nextStep);
          break;
        default:
          this.handleFailure();
      }
```

The above code will result in two logs to your console: one that will be `null` and the other should be an object with a few properties. The property to focus on is the `callbacks` property. This property contains the instructions for what needs to be rendered to the user for input collection.

To process these instructions, we will now use the `*ngFor` and `ngSwitch` directives to iterate over the callbacks and switch based on the callback type, so we can use the appropriate component to render something to the user. Once the user has provided their input and they submit the form, we want to catch the submission and invoke the nextStep function once again.

So starting with the form submission, we will add the following code inside the `<div id="callbacks">` tag in the `FormComponent` template (`features/journey/form.html`)


```
        <form
          #callbackForm
          (ngSubmit)="nextStep(step)"
          ngNativeValidate
          class="cstm_form">
          <!--
            Show a button to submit the form
          -->
          <app-button
            [buttonText]="buttonText"
            [submittingForm]="submittingForm"
          ></app-button>
        </form>
```

The form should now catch submission as we want it to; to iterate through the callbacks, add the following code inside the `<form>` tag you just added, just before the `<app-button>` tag:
```
          <!--
            Iterate through callbacks received from AM and invoke the callback to the appropriate callback component.
            The input to each component will be the callback and callback name, and the outputs will be the events emitted by the component.
            Events emitted by each component are handled by an expression mapping them to SDK functions, e.g. to set the password on the callback using the emitted value.
          -->
          <div
            *ngFor="let callback of step?.callbacks"
            v-bind:key="callback.payload._id"
          >
          </div>
```

To switch based on the type of the callback, add the following code within the `<div>` tag you just added:
```
            <!--
            ************************************************************************
            * SDK INTEGRATION POINT
            * Summary:SDK callback method for getting the callback type
            * ----------------------------------------------------------------------
            * Details: This method is helpful in quickly identifying the callback
            * when iterating through an unknown list of AM callbacks
            ************************************************************************
            -->

            <container-element [ngSwitch]="callback.getType()">
            </container-element>
```
Finally, to render something appropriate to the user based on the callback type, add the below code within the `<container-element>` tag you just added. 
```
              <!--
                ***************************************************************************
                * SDK INTEGRATION POINT
                * Summary: SDK callback methods for setting values
                * ------------------------------------------------------------------------
                * Details: Each callback is wrapped by the SDK to provide helper methods
                * for writing values to the callbacks received from AM
                ***************************************************************************
              -->

              <!--
                Any callbacks of type NameCallback, ValidatedCreateUsernameCallback, and StringAttributeInputCallback can all be handled by the Text component.
              -->
              <app-text
                *ngSwitchCase="'NameCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setName($event)"
              ></app-text>
              <app-text
                *ngSwitchCase="'ValidatedCreateUsernameCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setName($event)"
              ></app-text>
              <app-text
                *ngSwitchCase="'StringAttributeInputCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setValue($event)"
              ></app-text>

              <!--
                Any callbacks of type PasswordCallback or ValidatedCreatePasswordCallback can all be handled by the Text component
              -->
              <app-password
                *ngSwitchCase="'PasswordCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setPassword($event)"
              ></app-password>
              <app-password
                *ngSwitchCase="'ValidatedCreatePasswordCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setPassword($event)"
              ></app-password>

              <!--
                Handle a BooleanAttributeInputCallback using the Boolean component.
              -->
              <app-boolean
                *ngSwitchCase="'BooleanAttributeInputCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setValue($event)"
              ></app-boolean>

              <!--
                Handle a ChoiceCallback using the Choice component.
              -->
              <app-choice
                *ngSwitchCase="'ChoiceCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setChoiceValue($event)"
              ></app-choice>

              <!--
                Handle a TermsAndConditionsCallback using the TermsConditions component.
              -->
              <app-terms-conditions
                *ngSwitchCase="'TermsAndConditionsCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setAccepted($event)"
              ></app-terms-conditions>

              <!--
                Handle a KbaCreateCallback using the Kba component.
                Emitted questions and answers are used to set the values on the callback.
              -->
              <app-kba
                *ngSwitchCase="'KbaCreateCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (setQuestion)="$any(callback).setQuestion($event)"
                (setAnswer)="$any(callback).setAnswer($event)"
              ></app-kba>

              <!--
                 If current callback is not supported, render a warning message
              -->
              <app-unknown *ngSwitchDefault [callback]="callback"></app-unknown>
```

Refresh the page, and you should now have a dynamic form that reacts to the callbacks returned from our initial call to ForgeRock.

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/login-page-form.png" title="Login page form" caption="Screenshot of login page with rendered form" %}

Refresh the login page and use the test user to login. You will get a mostly blank login page if the user's credentials are valid and the journey completes. You can verify this by going to the Network panel within the developer tools and inspect the last `/authenticate` request. It should have a `tokenId` and `successUrl` property.

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/login-page-empty-success.png" title="Successful request without handling render" caption="Screenshot of empty login form & network request showing success data" %}

You may ask, “How did the user’s input values get added to the `step` object?” Let’s take a look at the component for rendering the username input. Open up the `Text` component: `app/features/journey/text/text.component.ts` and `app/features/journey/text/text.component.html`. When the user changes the value of the input, the `(input)` event fires and calls `updateValue()`, which in turn uses the `EventEmitter` defined in the `@Output` directive to emit the updated value to the parent component - in this case, the `FormComponent`. From here, the `FormComponent` calls the appropriate convenience method in the SDK to set the value for the callback. This final piece is shown below (this is already in your project so no need to copy in):
```
              <app-text
                *ngSwitchCase="'NameCallback'"
                [callback]="$any(callback)"
                [name]="callback?.payload?.input?.[0]?.name"
                (updatedCallback)="$any(callback).setName($event)"
              ></app-text>
```
{: .diff-highlight}

Each callback type has its own collection of methods for getting and setting data in addition to a base set of generic callback methods. These methods are added to the callback prototype by the SDK automatically. For more information about these callback methods, [see our API documentation](https://sdks.forgerock.com/javascript/api-reference-core/index.html), or [the source code in Github](https://github.com/ForgeRock/forgerock-javascript-sdk/tree/master/src/fr-auth/callbacks), for more details.

Now that the form is rendering and submitting, add conditions to the `FormComponent` template (`features/journey/form.html`), to handle the success and error response from ForgeRock. This code should be inserted inside the <ng-container> tag:

```diff-jsx
  <ng-template #successMessage>
    <!--
      Since we have successfully authenticated, show a success message to user while we complete the process and redirect to home page.
    -->
    <app-loading [message]="'Success! Redirecting ...'"></app-loading>
  </ng-template>

  <ng-template #failureMessage>
    <!--
      We have failed to authenticate, show a failure message to the user.
    -->
    <app-alert [message]="failure?.getMessage()" [type]="'error'"></app-alert>
  </ng-template>
```
{: .diff-highlight}

Once you handle the success and error condition, return back to the browser and [remove all cookies created from any previous logins](https://developer.chrome.com/docs/devtools/storage/cookies/). Refresh the page and login with your test user created in the Setup section above. You should see a “Success!” alert message. Congratulations, you are now able to authenticate users!

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/login-page-success.png" title="Login page with successful authentication" caption="Screenshot of login page with success alert" %}

### Step 3. Continuing to the OAuth 2.0 flow

At this point, the user is authenticated. The session has been created and a session cookie has been written to the browser. This is "session-based authentication", and is viable when your system (apps and services) can rely on cookies as the access artifact. However, [there are increasing limitations with the use of cookies](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/). In response to this, and other reasons, it's common to add an additional step to your authentication process: the “OAuth” or “OIDC flow”.

The goal of this flow is to attain a separate set of tokens, replacing the need for cookies as the shared access artifact. The two common tokens are the Access Token and the ID Token. We will focus on the access token in this guide. The specific flow that the SDK uses to acquire these tokens is called the Authorization Code Flow with PKCE.

To start, import the `TokenManager` object from the ForgeRock SDK into the same `form.js` file - replace the import you added to `features/journey/form.ts` earlier with the following code:

```
import {
  FRAuth,
  FRLoginFailure,
  FRLoginSuccess,
  FRStep,
  TokenManager,
  UserManager,
} from '@forgerock/javascript-sdk';
```

In addition to the components that we were already importing, we have now imported the `TokenManager` and `UserManager` from the SDK.

Only an authenticated user that has a valid session can successfully request OAuth/OIDC tokens. We must therefore make sure we make this asynchronous token request after we get a `'LoginSuccess'` back from the authentication journey. In the code we wrote in the previous section, our processing of the response means that a `'LoginSuccess'` results in a call to the currently-empty function `handleSuccess`. Let's invoke the OAuth 2.0 flow from here. Note that since the `getTokens` request is asynchronous, `handleSuccess` has been marked `async`.

Add the following code to the try block within `handleSuccess` to start the flow:

```
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Get OAuth/OIDC tokens with Authorization Code Flow w/PKCE.
       * ----------------------------------------------------------------------
       * Details: Since we have successfully authenticated the user, we can now
       * get the OAuth2/OIDC tokens. We are passing the `forceRenew` option to
       * ensure we get fresh tokens, regardless of existing tokens.
       ************************************************************************* */
      await TokenManager.getTokens({ forceRenew: true });
```

Once the changes are made, return back to your browser and remove all cookies created from any previous logins. Refresh the page and verify the login form is rendered. If the success message continues to display, make sure “third-party cookies” are also removed.

Login with your test user. You should get a success message like you did before, but now check your browser’s console log. You should see an additional entry of an object that contains your `idToken` and `accessToken`. Since the SDK handles storing these tokens for you, which are in `localStorage`, you have completed a full login and OAuth/OIDC flow.

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/login-page-oauth-success.png" title="Login page with OAuth success" caption="Screenshot of login page with success alert and console log" %}

### Step 4. Request user information

Now that the user is authenticated and an access token is attained, you can now make your first authenticated request! The SDK provides a convenience method for calling the `/userinfo` endpoint, a standard OAuth endpoint for requesting details about the current user. The data returned from this endpoint correlates with the "scopes" set within the SDK configuration. The scopes `profile` and `email` will allow the inclusion of user's first and last name as well as their email address.

To retrieve user information, we add another single line of code to invoke the `getCurrentUser()` function of the SDK, underneath the `getTokens()` call:

```
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Call the user info endpoint for some basic user data.
       * ----------------------------------------------------------------------
       * Details: This is an OAuth2 call that returns user information with a
       * valid access token. This is optional and only used for displaying
       * user info in the UI.
       ********************************************************************* */
      let info = await UserManager.getCurrentUser();
```

We want to store the fact that the user is authenticated, together with the user information we retrieved, in a state that can be shared with other Angular components in our app. To do this, we have injected the service `UserService` into `FormComponent`. This service is also injected into other components that should need access to authentication status and user information.

To update the `UserService` and redirect the user to the home page, add the following code below the `getCurrentUser()` call:

```
      this.userService.info = info;
      this.userService.isAuthenticated = true;

      this.router.navigateByUrl('/');
```

Revisit the browser, clear out all cookies, storage and cache, and log in with you test user. If you landed on the home page and the logs in the console show tokens and user data, you have successfully used the access token for retrieving use data. Notice that the home page looks a bit different with an added success alert and message with the user's full name. This is due to the app “reacting” to the state in the `UserService` that we set just before the redirection.

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/home-page-authenticated-userinfo.png" title="Home page with userinfo" caption="Screenshot of home page with successful login and user info" %}

### Step 5. Reacting to the presence of the access token

To ensure your app provides a good user-experience, it’s important to have a recognizable, authenticated experience, even if the user refreshes the page or closes and reopens the browser tab. This makes it clear to the user that they are _logged in_.

Currently, if you refresh the page, the authenticated experience is lost. Let's fix that!

Because the `getCurrentUser()` function requires the user to be authenticated and to have obtained an access token, you can use the success of this call as a _hint_ for their authentication status without requiring several network requests. This allows for quickly determining if the user is authenticated on page load, rendering the appropriate navigational elements and content to the screen.

To do this, add the `TokenStorage.get` method to the `ngOnInit()` function in the main component - `src/app/app.component.ts`. The following code should go after the `Config.set()` call, and will provide what we need to rehydrate the user's authentication status:

```
    /** *****************************************************************
     * SDK INTEGRATION POINT
     * Summary: Optional client-side route access validation
     * ------------------------------------------------------------------
     * Details: Here, you could just make sure tokens exist –
     * TokenStorage.get() – or, validate tokens, renew expiry timers,
     * session checks ... Below, we are calling the userinfo endpoint to
     * ensure valid tokens before continuing, but it's optional.
     ***************************************************************** */
    try {
      // Assume user is likely authenticated if there are tokens
      let info = await UserManager.getCurrentUser();
      this.userService.isAuthenticated = true;
      this.userService.info = info;
    } catch (err) {
      // User likely not authenticated
      console.log(err);
    }
```

With a global state API available throughout the app using `UserService`, different components can pull this state in and use it to conditionally render one set of UI elements versus another. Navigation elements and the displaying of profile data are good examples of such conditional rendering. Examples of this can be found by reviewing `src/app/layout/header/header.component.ts` and `src/app/views/home/home.component.ts`.

### Step 6. Validating the access token

The presence of the access token can be a good _hint_ for authentication, but it doesn’t mean the token is actually valid. Tokens can expire or be revoked on the server-side.

You can ensure the token is still valid with the use of `getCurrentUser` method from earlier. This is optional, depending on your product requirements. If needed, you can protect routes with a token validation check before rendering portions of your application. This can prevent a potentially jarring experience of partial rendering UI that may be ejected due to an invalid token.

To validate a token for protecting a route, open the `src/app/auth/auth.guard.ts` file which uses the `CanActivate` interface, replace the existing false function return with the following code:

```
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
```

Let’s take a look at what this implementation does. First, we check the injected `UserService` for the user's authentication status. If this has been set to true by another part of the application, we provide access to the page by returning true. However if it isn't, then we will run through the same check that the main component `src/app/app.component.ts` performs. If this fails, i.e. if the user is not authenticated, then they are redirected back to the login page to authenticate.

Revisit the browser and refresh the page. Navigate to the todos page. You will notice a quick spinner and text communicating that the app is "verifying access". Once the server responds, the Todos page renders. As you can see, the consequence of this is the protected route now has to wait for the server to respond, but the user's access has been verified by the server.

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/verifying-access.png" title="Loading screen while verifying access" caption="Screenshot of loading screen while verifying access" %}

### Step 7. Request protected resources with an access token

Once the Todos page renders, notice how the the todo collection has a persistent spinner to indicate the process of requesting todos. This is due to the `fetch` request not having the proper headers for making an authorized request, so the request does not succeed.

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/todos-page-loading.png" title="To-dos page loading to-dos" caption="Screenshot of to-dos page with persistent spinner" %}

To make resource requests to a protected endpoint, we have an `HttpClient` module that provides a simple wrapper around the native `fetch` method of the browser. When you call the `request` method, it will retrieve the user’s access token, and attach it as a Bearer Token to the request as an `authorization` header. This is what the resource server will use to make its own request to the ForgeRock server to validate the user’s access token.

All requests to the Todos backend live in the `TodoService`, which is injected into the `TodosComponent` which renders the `/todos` page. Each of the functions dedicated to a particular backend request, call the convenience function `request()`, which needs to use the ForgeRock SDK `HttpClient`.

To import the `HttpClient`, add the following import to the top of `src/app/services/todo.service.ts`:

```
import { HttpClient } from '@forgerock/javascript-sdk';
```

Now, complete the `request()` function to use the `HttpClient` to make requests to the Todos backend - replace the existing return statement with the following:

```
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: HttpClient for protected resource server requests.
     * ------------------------------------------------------------------------
     * Details: This helper retrieves your access token from storage and adds
     * it to the authorization header as a bearer token for making HTTP
     * requests to protected resource APIs. It's a wrapper around the native
     * fetch method.
     *********************************************************************** */
    return HttpClient.request({
      url: resource,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        method: method,
      },
      timeout: 5000,
    });
```

At this point, the user can login, request access tokens, and access the page of the protected resources (todos). Now, revisit the browser and clear out all cookies, storage and cache. Keeping the developer tools open and on the network tab, log in with you test user. Once you have been redirected to the home page, do the following:

1. Click on the “Todos” item in the nav; a lot of network activity will be listed
2. Find the network call to the `/todos` endpoint (`https://api.example.com:9443/todos`)
3. Click on that network request and view the request headers
4. Notice the `authorization` header with the bearer token; that’s the `HttpClient` in action

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/todos-page-successful-request.png" title="To-dos page with successful request" caption="Screenshot of successful request for to-dos with Network panel open" %}

### Step 8. Handle logout request

Of course, you can’t have a protected app without providing the ability to log out. Luckily, this is a fairly easy task using the SDK.

Open up the `LogoutComponent` file `src/app/services/todo.service.ts` and import `FRUser` from the ForgeRock SDK:

```
import { FRUser } from '@forgerock/javascript-sdk';
```

Logging the user out and revoking their tokens is easy using the `logout()` function of `FRUser`. To do this, then clear the user's authentication status and user information from `UserService` (and therefore other parts of the application since this is injected in many places), add the following code to `logout()`:

```
    try {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Logout, end session and revoke tokens
       * ----------------------------------------------------------------------
       * Details: Since this method is a global method via the Context API,
       * any part of the application can log a user out. This is helpful when
       * APIs are called and we get a 401 response, but here we respond to user
       * input clicking logout.
       ********************************************************************* */
      await FRUser.logout();
      this.userService.info = undefined;
      this.userService.isAuthenticated = false;
      setTimeout(() => this.redirectToHome(), 1000);
    } catch (err) {
      console.error(`Error: logout did not successfully complete; ${err}`);
    }
  }
```
{: .diff-highlight}

Once all the above is complete, return to your browser, empty the cache, storage and cache, and reload the page. You should now be able to login with the test user, navigate to the todos page, add and edit some todos, and logout by clicking the profile icon in the top-right and clicking "Sign Out".

{% include full-image-with-caption.html imageurl="/images/community/build-angular-app/logout-page.png" title="Logout page" caption="Screenshot of logout page with spinner" %}

Congratulations, you just built a ForgeRock protected app with Angular!