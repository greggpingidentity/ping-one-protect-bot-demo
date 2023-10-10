# IMPORTANT - LINKS MAY NOT WORK AS INTENDED IN THE GLITCH INTERFACE
For a better viewing experience open this link in a new tab:
https://github.com/Technical-Enablement-PingIdentity/BXIndustry-Handlebars/blob/main/documentation/README.md

# Table of Contents
1. [Introduction](#introduction)
    1. [Standard Flows](#standard-flows)
    2. [Remixing](#remixing)
    3. [PingOne Environment](#ping-one)
    4. [Note on Versioning](#versioning-note)
    5. [Note on CSS](#css-note)
    6. [Switching the Verticals](#verticals)
    7. [BXGeneric](#bxgeneric)
    8. [Need Help?](#help)
2. [Development](#development)
    1. [Home Pages](#home-page)
        1. [Simulate Login](#simulate-login)
    2. [Dashboard Pages](#dashboard-page)
        1. [Simulate Logout](#simulate-logout)
    3. [Project Structure](#project-structure)
        1. [Global Files](#global-files)
        2. [Vertical Files](#vertical-files)
            1. [Vertical Settings](#vertical-settings)
        3. [Images/Static Content](#images)
        4. [HTML Templates for DaVinci](#templates)
        5. [Other Locations](#other-locations)
    4. [bxi-davinci.js Documentation](#bxi-davinci-js)
        1. [Additional Information on data-dv-params](#additional-info-params)
        2. [Additional Information on Callbacks](#additional-info-callbacks)
        3. [Examples](#bxi-davinci-examples)
    5. [Continue Tokens](#continue-tokens)
    6. [Debugging](#debugging)
3. [Installation](#installation)
    1. [Local Set Up](#local-set-up)
    2. [Environment](#environment)

# Introduction<a name="introduction"></a>

[BXIndustry](https://demo.bxgeneric.org/) is a unique demo in that it allows demonstrators to bootstrap DaVinci demonstrations! It allows demo-ers to tailor the skins to highlight a number of DaVinci flows that they have developed or will be developing. There are many different industry verticals which can be cloned and adapted on Glitch to tailor to your prospect or customer for a more personalized demo in the field. 

The following verticals are available in Glitch for your to remix:
1. [Generic](https://demo.bxgeneric.org/generic) - Formerly BXGeneric
2. [Airlines](https://demo.bxgeneric.org/airline)
3. [Company](https://demo.bxgeneric.org/company)
4. [Eats](https://demo.bxgeneric.org/eats)
5. [Education](https://demo.bxgeneric.org/education)
6. [Finance](https://demo.bxgeneric.org/finance)
7. [Government](https://demo.bxgeneric.org/government)
8. [Health](https://demo.bxgeneric.org/health)
9. [Hotels](https://demo.bxgeneric.org/hotels)
10. [Insurance](https://demo.bxgeneric.org/insurance)
11. [Manufacturing](https://demo.bxgeneric.org/manufacturing)
12. [Pharmacy](https://demo.bxgeneric.org/pharmacy)
13. [Realty](https://demo.bxgeneric.org/realty)
14. [Retail](https://demo.bxgeneric.org/retail)
15. [Sports](https://demo.bxgeneric.org/sports)
16. [Volunteer](https://demo.bxgeneric.org/volunteer)

With BXIndustry, you can choose a vertical you would like to use, build your workflows and forms in DaVinci, and update the settings.json file to change page content such as text and images. HTML templates are available for different modal forms for use in DaVinci see [HTML Templates for DaVinci](#templates).

**Note: Flows are now customized in BXI via HTML data attributes for simplicity. Please see the documentation on [bxi-davinci.js](#bxi-davinci-js) for more information.**

## Standard Flows<a name="standard-flows"></a>

BXIndustry comes with standard authentication and registration flows! The flow JSON exports are included in your remix. You can download them from the Helpful Links modal on the /shortcuts page which can be accessed by clicking the gear icon on the bottom left of each vertical. The zip file that is downloaded is located at public/DXI-DV-Flows.zip in your repository.

Registration will ask for a valid email, password, first name and last name. Successful completion of registration will register the user into our PingOne environment, enable MFA for the user, and enroll the provided email as an MFA device.

Authentication will ask for the previously registered email and password, then prompt the user to complete MFA with the enrolled PingOne MFA email device. Successful completion of authentication will land the user on the dashboard page of the vertical they are on and display their username. The dashboard page contains a simple profile management flow, this showcases the PingOne session integration with DaVinci.

## Remixing<a name="remixing"></a>

To remix BXIndustry, scroll to the bottom of the page on any vertical and click the **Remix on Glitch** button. During the remixing process, you can modify all DaVinci API values or leave them as-is to use the default settings. The values collected from this form can be found in the .env file of your Remix at a later time if needed. See the [environment](#environment) section.

**Note: The remix form will pre-populate the default authentication and registration flows. These values can be modified to import your own custom flows or leave them as-is to use the default settings.**

The default vertical should be one value from the list:

- airlines
- company
- eats
- education
- finance
- generic
- government
- health
- hotels
- insurance
- manufacturing
- pharmacy
- realty
- retail
- sports
- volunteer

**Note: When trying to remix in Safari or with content blockers, you may not get a new tab with your remix after you complete the remix form. If this happens you should get an error screen with a textarea containing the URL for a new remix. Copy/paste this into a new tab and you should be all set!**

## PingOne Environment<a name="ping-one">

In order to use BXIndustry with your PingOne environment, ensure you have the SSO, MFA and DaVinci services added. Next create a MFA connection and fill in the properties. No need to change the the default login experience in PingOne, MFA is done through the DaVinci flows. Then import the Login and Registration flows into your DaVinci environment, you can dowload these from [Google Drive](https://drive.google.com/drive/folders/1IXTIWaLzWM6E7X_nHUY8qgOUX52SCqrE). Finally create a new application and add flow policies for each of those flows, note the policy IDs and API Key and include them in the remix form when you create a remix. If you already have a remix you can update those values in the .env file at the root of the project.

## An (IMPORTANT!!) Note on Versioning<a name="versioning-note"></a>

We recommend making as many changes in DaVinci workflows as you can because there is no easy upgrade path to new BXI versions in your existing remixes when we release new features and bug fixes. Further customizations to BXI can typically be done in a small subset of files to make porting to new remixes easy. See the [project structure](#project-structure) section for more details.

## Another (IMPORTANT!!) Note on CSS<a name="css-note"></a>

We recommend that you try to stick with the default templates provided in the dialog examples noted [below](#templates) when putting HTML into DaVinci. It is not recommended to import CSS libraries or do other extensive styling in DaVinci because those styles can bleed out of your flows to the entire BXIndustry site when a flow is loaded. 

If you must apply custom styles please try to scope them via specific IDs (`#element-id {...}`) or classes (`.element-class {...}`) to prevent your styles from affecting your site.

Bootstrap 5.2 is now included in BXI and can be used within your flows. The default templates use bootstrap as well and should be easy to tweak as needed! See [Bootstrap documentation](https://getbootstrap.com/docs/5.2/) for more information on how to use bootstrap.

## Switching the Verticals<a name="verticals"></a>

Use the gear icon in the bottom right corner to open the “shortcut” page for all of the verticals. If you'd like to change the default vertical, change the `BXI_ACTIVE_VERTICAL` variable in the .env file to one of the verticals listed in [remixing](#remixing).

## BXGeneric<a name="bxgeneric"></a>

[BXGeneric](https://demo.bxgeneric.org/) is now part of BXIndustry! To create a BXG remix click **Remix on Glitch**, and change the vertical dropdown to Generic. When Generic is chosen you will be prompted for a static policy id. This is the flow that is loaded on the page when it loads. Generic is essentially just another vertical so it is located at `<hostname>/generic`. The Log In and Sign Up buttons are the same as any other vertical in BXI.

**Note: BXGeneric does not include a dashboard page at this time, so you will not be redirected anywhere after you complete registration or log in.**

## Need Help?<a name="help"></a>

Feel free to reach out to the demo team via our [Slack Channel](https://pingidentity.slack.com/archives/C01KH01F1MY) if you need help setting up your remix or flows. This is also a great place to stay up-to-date on demo releases and submit feedback for features or bugs.

# Development<a name="development"></a>

## Home Pages<a name="home-page"></a>

Each vertical has a home page located at `src/pages/<vertical>/index.hbs` which is accessed in the browser via `<hostname>/<vertical>`. The home page displays Authn flows through `src/home-nav-buttons.hbs` at the top right of the page, so button customizations can be done in that file and will propagate through all verticals.

### Simulate Login<a name="simulate-login"></a>

Out of the box, there is now an option to simulate a user being logged into the dashboard after completing successful login or registration. Your Login/Registration DV flow must return a successful JSON response including an `additonalProperties.username` property in order for this to work. You can customize this in the `public/register-functions.js` file in the `defaultAuthnSuccess` function.

## Dashboard Pages<a name="dashboard-page"></a>

Each vertical (except for generic) has a dashboard page located at `src/pages/<vertical>/dashboard.hbs` which is accessed in the browser via `<hostname>/<vertical>/dashboard`. To enable the static Dashboard DaVinci flow for all verticals, the .env file should have a value for `BXI_DASHBOARD_POLICY_ID`, and it will be loaded on each vertical at page load. Similarly, DV Buttons are available on the dashboard page as well, these can be uncommented and customized in the `src/dashboard-buttons.hbs` file.

The Dashboard section in the file includes the `"username"` key, which will be displayed in the dashboard page header. By default, if there is a value contained in sessionStorage called `'bxi_username'` it will override a static username, this can be customized in the `public/register-function.js` file in `bxi.pageLoad` near the top.

### Simulate Logout<a name="simulate-logout"></a>

Currently, logout redirects the user to the current vertical home page. If you need to add any tear-down logic like clearing session data, there is now a function in public/register-functions.js called bxi.logout where you can add customizations. Be sure to add code before the `window.location.assign` call or it will be ignored.

## Project Structure<a name="project-structure"></a>

Since glitch creates a copy of the BXI source code when you create a remix, when upgrading to a new version of BXI you will need to create a new remix and start from scratch. With this in mind most customizations can be made in a small subset of files.

### Global Files<a name="global-files"></a>

Buttons to launch DaVinci flows are now located in `src/home-nav-buttons.hbs` and `src/dashboard-buttons.hbs` and are customized with HTML data attributes instead of through settings.json files.

- `src/home-nav-buttons.hbs` - collection of buttons displayed in the top nav of each vertical, by default these are hooked up to flow policies defined in your .env file
- `src/dashboard-buttons.hbs` - collection of buttons displayed in the top of the dashboard content section of each vertical, there are no defaults, however examples have been left commented out in the file for reference
- `public/register-functions.js` - register callback functions that can be run during various stages of application/flow execution (see [bxi-davinci.js](#bxi-davinci-js) for more information)

### Vertical Files<a name="vertical-files"></a>

Each vertical contains four files in case you only need to focus on one vertical for your demo, these are located in `src/pages/<vertical>`:

- `src/pages/<vertical>/settings.json` - Simple content changes may be made in this file
- `src/pages/<vertical>/index.hbs` - root page of your vertical (e.g., `<hostname>/company`), contains home page HTML
- `src/pages/<vertical>/dashboard.hbs` - dashboard page for your vertical (e.g., `<hostname>/company/dashboard`), contains dashboard HTML
- `src/pages/<vertical>/branding.hbs` - handlebars file that contains CSS variables used for branding

#### Vertical Settings<a name="vertical-settings"></a>

Each vertical has an independent **settings.json** file.
For example:
- `src/pages/airlines/settings.json`
- `src/pages/education/settings.json`
- ...

Settings files provide the ability to make quick changes for vertical text and images.

`"title": "BX<vertical-name>"` - This is the project name which displays in the head of the page.

Color and other branding options are located in `branding.hbs`.

```css
    <style>
      :root {
        --bxi-primary-color: #A71E23;
        --bxi-secondary-color: #280A04;
        ...
      }
    </style>
```

### Images/Static Content<a name="images"></a>

You can add images in two ways:
- CDN URL (e.g., Glitch Assets)
- File name (extension included) - will be delivered from internal `public/<vertical>` folder, if you'd like to add/update images, you can add them to that folder and reference them in the associated [settings.json](#vertical-settings) file.

The `images` section includes basic pictures for the specific vertical (favicon and logo). These can also be full urls if you've uploaded images to Glitch Assets (or elsewhere).

```json
  "images": {
    "favicon": "/<vertical>/favicon.ico",
    "apple_touch_icon": "/<vertical>/apple-touch-icon.png",
    "logo": "/<vertical>/logo.png",
    "dialog_logo": "/<vertical>/auth-dialog-logo.png"
  },
```

If you would like to remove an image because you have rebranded, you can just set the image property to an empty string, e.g., to remove the logo from dialogs:

```json
  "images": {
    ...
    "dialog_logo": "",
  }
```

**Note: there is now a data attribute to hide dialog logos as well! See [bxi-davinci.js](#bxi-davinci-js) documentation for more info.**

**Note: if you're [running the project locally](#installation) make sure to restart `npm start` if you add new static files, they are only picked up when the server starts.**

### HTML Templates for DaVinci<a name="templates"></a>

HTML templates are available for DaVinci flows in the `src/templates` directory.

To preview the modals, add  **/dialog-examples** to the vertical url and click the button associated with the template you'd like to view.

For example:
- [/manufacturing/dialog-examples](https://demo.bxgeneric.org/manufacturing/dialog-examples)
- [/airlines/dialog-examples](https://demo.bxgeneric.org/airlines/dialog-examples)
- ...

To build out your UI's manually there is a collection of all elements used in the examples broken down in `src/templates/all-elements.hbs`. When building out your form, ensure all form elements and the submission button are wrapped in a `<form>` tag so DaVinci can pick up form submissions.

### Other Locations<a name="other-locations"></a>

Generally speaking you should not need to change files that were not previously mentioned, and shouldn't unless you know what you're doing. For information purposes, below is a quick description of other locations within BXI:

- `public/js/*` - internal BXI JavaScript resources
- `public/bxi-davinci.js` - internal JavaScript file wrapping DaVinci and bootstrapping [data-attributes](#bxi-davinci-js)
- `resources/handlebars.js` - handlebars initialization (partials, etc), used by `server.js`
- `resources/helpers.js` - helpers used by `server.js` if you need to whitelist additional .env variables (for availability in .hbs files or `window._env_`) you can do so near the top
- `scss/*` - SCSS that is compiled into `public/styles.css`, each vertical has a `customizations.scss` file for vertical branding tweaks
- `src/partials/*` - internal handlebars partials, if you add additional partials they will be automatically picked up on server initialization, see `resources/handlebars.js` for information on partial naming

## bxi-davinci.js Documentation<a name="bxi-davinci-js"></a>

With the new version of BXI, it is easier to further customize where and how you launch flows! Default configurations are now plain HTML in the `src/home-nav-buttons.hbs` and `src/dashboard-buttons.hbs` file. These are in a centralized location so they can be used in all verticals!

**Note: It is not recommended to include company id or api key in your front-end HTML or JavaScript for security reasons. Try to keep all of your flow policies in the same DaVinci Environment and Application and set the appropriate values in the .env file. That being said data attributes for overriding api key and company id are provided for edge cases.**

You can manually configure html elements to load flows by applying the following attributes to any element:

|Attribute|Description|Default Value|Required|
|------|------|:------:|:------:|
|`data-dv-flow`|How your flow will be loaded on the page, value options are 'static' or 'modal'|-|Yes|
|`data-policy-id`|Policy ID that will be used to invoke your flow|-|Yes (unless `data-url-policy-id` is used)|
|`data-company-id`|Company ID that will be used to invoke your flow|`BXI_COMPANY_ID` from .env|
|`data-api-key`|API Key that will be used to invoke your flow (not recommended)|`BXI_API_KEY` from .env|
|`data-hide-logo`|If "true" the vertical logo on the resulting modal will be hidden|`false`|
|`data-url-policy-id`|If set, will look for the policy ID in a URL parameter of the same name|-|
|`data-url-company-id`|If set, will look for the company ID in a URL parameter of the same name|-|
|`data-url-api-key`|If set, will look for the api key in a URL parameter of the same name (not recommended)|-|
|`data-dv-param-<name>`|These will be passed to DaVinci as parameters of the request, see more about usage below|-|
|`data-success-callback`|Success callback that is called from the function registry when a flow returns a success response|-|
|`data-error-callback`|Error callback that is called from the function registry when a flow returns an error response|-|
|`data-parameter-factory`|The return object from this function will be merged with any data-dv-param attributes and sent in the parameters property of the DaVinci flow request|-|

**Note: Static flows are loaded on page load, and they use the HTML element the attribute is included on as a container to display the widget. For best results, we recommend using a `<div>` element for this.**

**Note: Modal flows are loaded when the HTML element the attribute is included on is clicked. For best results, we recommend using a `<button>` element for this.**

### Additional Information on data-dv-param<a name="additional-info-params"></a>

To pass parameters in the DaVinci request that is sent when the flow is loaded, use `data-dv-param-<name>` attributes. You can use as many of these attributes as you need on an element. The parameter name that is sent to DaVinci is inferred in a couple ways. It will remove data-dv-param- and the rest of the name will be used as the parameter name in PascalCase. To customize the parameter name (e.g., as a different casing) you can do so by adding the parameter name in front of two colons before the value. See last [example](#bxi-davinci-examples) below.

### Additional Information on Callbacks<a name="additional-info-callbacks"></a>

Currently there are three places you can inject callback functions during DaVinci flow execution:
- prior to the request being send to `davinci.js` for dynamically retrieving flow parameters
- flow successCallback
- flow errorCallback

In order to use these, ensure you have registered a function in `public/register-functions.js` and that the value in `data-success-callback`, `data-error-callback` or `data-parameter-factory` on your flow trigger HTML control matches a function name in the registry. Asyncronous functions in the registry work as well!

Technically you can register a function anywhere after `initFunctionRegistery()` is called in the `bxi-davinci.js` file, however we recommend they are added to the `public/register-functions.js` file so they are in a centralized location and are easy to port over to a new remix if we release new features you'd like to have.

To register a function you must provide the function with a name, you can do that using a string value and an anonymous function, or just passing a named function

```javascript
bxi.registerFunction('callbackName', () => {...}); // Anonymous function usage
bxi.registerFunction(function callbackName() {...}); // Named function usage

// Either of these usages can also be asyncronous and will be awaited when they are used
bxi.registerFunction('callbackName', async () => {...}); // Anonymous function usage
bxi.registerFunction(async function callbackName() {...}); // Named function usage
```

To use a registry function add the name of the registered function (case sensitive) to the appropriate data attribute on the HTML control

```html
<button data-dv-flow="modal" data-policy-id="xxx" data-success-callback="callbackName">Log In</button>
```

When using a parameter factory function, you must return an object that will be merged with any data-dv-params present on your HTML element

**Note: the factory result will override data-dv-params if any duplicate properties are present**

```javascript
bxi.registerFunction(function loginParams() { 
   return { FirstName: 'Fred', LastName: 'Tester' };
});

// HTML Usage
// <button data-dv-flow="modal" data-policy-id="xxx" data-parameter-factory="loginParams">Log In</button>
```

### Examples<a name="bxi-davinci-examples"></a>

**Simple Modal**

This example adds a login button that launches policy id xxx and uses the API Key and Company ID included in the .env file.

```html
  <button data-dv-flow="modal" data-policy-id="xxx">Log In</button>
```

**Static Widget**

This example looks for a url parameter called "profilePolicyId" (case sensitive) and uses the value as the policy id to load the flow on page load. The flow loads in this element since it's static, so position it on the page where you'd like the flow to be.

```html
  <div data-dv-flow="static" data-url-policy-id="profilePolicyId"></div>
```

**Param Usage**

This example will result in parameters that are sent to DaVinci with the flow start request. The resulting JSON that is sent to DV is below the HTML example.

```html
  <div data-dv-flow="modal" data-policy-id="xxx" data-dv-param-first-name="John" data-dv-param-last-name="lastName::Smith"></div>
```

```json
{
  "FirstName": "John",
  "lastName": "Smith"
}
```
**Note: you can use `data-dv-param` in conjunction with a `data-parameter-factory` callback function. The callback function is given priority over the `data-dv-param` attributes if any duplicate properties are encountered.**

## Continue Tokens<a name="continue-tokens"></a>
Continue tokens are handled out of the box in BXI, bxi-davinci will attempt to continue the flow in the same container where they were originally launched from. If you redirect to a different page within BXI from the 'Appication Return To URL' field in your connector, make sure to add a static or modal element on the new page with the same data-policy-id attribute for the continueToken logic to hook onto.

## Debugging<a name="debugging"></a>
You can add an additional key to the .env file at the base of your project to see advanced debugging output. There will be additional logging both in the server terminal and in your browser.

```sh
BXI_DEBUG_LOGGING=true
```

# Installation<a name="installation"></a>

BXIndustry is normally run through the glitch interface, however for heavy development it may be easier to run the project locally which is easy!

## Local Set Up<a name="local-set-up"></a>

Required software:
- Git
- NodeJS (see `.nvmrc` at the root of the project for the currently supported version)
- Code Editor (such as Visual Studio Code)

To run your project locally, clone the repo to your computer by navigating to the glitch project, clicking Tools > Import / Export, and copying your projects Git URL to your clipboard.

```sh
git clone <git-url>
cd <glitch-project-name>
npm install
# Generate .env file or copy from the glitch interface
npm start
```

Once you have downloaded the repo, make sure you have a `.env` file in the root of the repo and copy the contents of the same file from the Glitch interface into that file.

**Note: if you would like to push changes you make on your computer back up to Glitch you will need to follow this article [Push Code to Glitch](https://glitch.happyfox.com/kb/article/85-how-do-i-push-code-that-i-created-locally-to-my-project-on-glitch/).**

## Environment<a name="environment"></a>

To start BXIndustry, you must have the following .env variables:

```sh
BXI_API_URL= # Default hostname used by davinci.js for running flows
BXI_DV_JS_URL= # Default location where davinci.js should be loaded from, this should be the full URL
BXI_SDK_TOKEN_URL= # Default hostname to use for retrieving a DV Token for running your flows
BXI_API_KEY= # Default API Key used for running all flows in your Remix
BXI_COMPANY_ID= # Default Company ID used for running all flows in your Remix
BXI_LOGIN_POLICY_ID= # Default Policy ID used when clicking Log In link on all verticals
BXI_REGISTRATION_POLICY_ID= # Default Policy ID used when clicking Sign Up link on all verticals
BXI_DASHBOARD_POLICY_ID= # Policy ID used on all dashboard pages to load a static widget
BXI_GENERIC_POLICY_ID= # Only used on the generic vertical, static widget that is loaded on page load
BXI_ACTIVE_VERTICAL= # vertical you will be redirected to when you hit the root page (e.g., <project-name>.glitch.me/) see Remixing section for options
BXI_DEBUG_LOGGING= # Optional, setting to 'true' will output additional information in the server and browser console
```

**Note: changing environment variables will require you to re-run `npm start` before variables are picked up by the server and propagated throughout the application**
