function registerFunctions(logger) {

  /**
   * Add custom code here to do any page load actions, called on body tag in onload=""
   */
  bxi.pageLoad = () => {
    // Page load set up code here

    // Set the username container on the dashboard page to whatever is in sessionStorage
    const usernameContainer = document.getElementById('username-container');
    const username = sessionStorage.getItem('bxi_username');
    if (usernameContainer && username) {
      logger.log(`username found in session storage and a container was found, '${username}' will be displayed`)
      usernameContainer.textContent = username;
    }
  };

  /**
   * Add custom code here to do any logout teardown you need to do, called when Log Out is clicked
   */
  bxi.logout = async () => {
    // Tear-down code here

    // Change this to sessionStorage.clear() if you'd like to remove everything
    sessionStorage.removeItem('bxi_username');
    logger.log('Logout occured, username has been cleared from session storage if it existed');

    await fetch('/logout');

    // This call should be last
    window.location.assign(`/${window.location.pathname.split('/')[1]}`);
  };

  /**
   * You may register functions that you would like to hook into during flow execution here. Functions are called by name passed in the 
   * associated data attribute (e.g. data-success-callback="loginSuccess")
   * 
   * Please note you can pass in a named function (e.g. bxi.registerFunction(function loginSuccess(res) {...}); )
   * or you may pass in a name as string with an anonymous function (e.g. bxi.registerFunction('loginSuccess', (res) => {...}); )
   * Function calls are awaited so async functions and promises are supported!
   * 
   * We provided this file as a centralized location for registering callbacks, however it is purposely exposed on the window.bxi object
   * so you may register callbacks anywhere in your application as long as it's after bxi-davinci.js is loaded (initFunctionRegistry() has been called)
   */

  bxi.registerFunction('remixParameters', async () => {
    const verticals = await fetch('/verticals');
    const verticalsParam = (await verticals.json()).map(v => ({ name: v.charAt(0).toUpperCase() + v.slice(1), value: v }));
    return { CurrentVertical: window.location.pathname.split('/')[1], Verticals: verticalsParam };
  });

  bxi.registerFunction('defaultAuthnSuccess', async response => {
    logger.log('defaultAuthnSuccess called with DV response', response);
    
    // Check for username in response, if present set it in sessionStorage and redirect to the dashboard
    const username = window.bxi.getParameterCaseInsensitive(response.additionalProperties, 'username');
    if (username) {
      logger.log('username found in response, setting it in session storage and redirecting to dashboard');
      sessionStorage.setItem('bxi_username', username);

      // Generic vertical doesn't have a dashboard page
      if (window.location.pathname.includes('generic')) {
        return;
      }
      
      // Redirect to <current-vertical>/dashbaord
      let url = window.location.pathname + '/dashboard';

      // If you customize this function and still want redirect to work, this call should be last
      window.location.assign(url);
    }
  });

  bxi.registerFunction('logout', async response => {
    if (response.additionalProperties?.staleSession) {
      await bxi.logout();
    }
  });
}

// This function is executed in bxi-davinci.js after the function registry is initialized
export default registerFunctions;