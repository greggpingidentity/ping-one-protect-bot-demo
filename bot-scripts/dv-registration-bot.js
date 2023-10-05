//PROTECT APP LOCATION
//--Perform Bot Attack against shared glitch application
const baseUrl = 'https://soaring-orchestrated-skies.glitch.me'
//--Perform Bot Attack against local deployment of PingOne Protect Application
// const baseUrl = 'http://localhost:3000'

//OS CONFIGURATION
//--MAC-Chrome-Browser-Path
const browserExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
//--Windows-Chrome-Browser-Path
// const browserExecutablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

//VISIBILITY
const browserHiddenSetting = false
// const browserHiddenSetting = true

//const myCursor = require('ghost-cursor')
const puppeteer = require('puppeteer-extra')
//const {installMouseHelper} = require('./install-mouse-helper');

// Add stealth plugin and use defaults 
const pluginStealth = require('puppeteer-extra-plugin-stealth')
const stealth = pluginStealth()
const { executablePath } = require('puppeteer');

//stealth.enabledEvasions.delete('user-agent-override')
console.log(stealth.availableEvasions);
puppeteer.use(stealth)

// Stealth plugins are just regular `puppeteer-extra` plugins and can be added as such
const UserAgentOverride = require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
// Define custom UA and locale
const ua = UserAgentOverride({
  userAgent: 'MyFunkyUA/1.0',
  locale: 'de-DE,de'
})
puppeteer.use(ua)

puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled', '--disable-web-security', '--disable-xss-auditor'], executablePath: browserExecutablePath }).then(async browser => {
  //browser new page

  //browser new page
  const p = await browser.newPage();

  await p.setBypassCSP(true);

  //launch URL
  await p.goto(baseUrl)
  console.log("timeout started")
  await p.waitForTimeout(3000)
  console.log("timeout ended")

  //const cursor = myCursor.createCursor(p)
  await p.click('#registerButton');
  console.log("clicked registerButton");
  await p.waitForTimeout(3000)

  await p.waitForSelector('input[id="email"]');

  // generate random email
  var randomnumber = Math.floor(Math.random() * (99999 - 100 + 1)) + 100;
  console.log(randomnumber)

  var randomemail = "ggg" + randomnumber + "@example.com";
  console.log(randomemail)

  await p.waitForTimeout(3000)
  await p.type('input[id="email"]', randomemail);
  await p.waitForSelector('input[id="firstName"]');
  await p.type('input[id="firstName"]', 'GGG')
  console.log("put in first name");
  await p.waitForSelector('input[id="lastName"]');
  await p.type('input[id="lastName"]', 'BotTest')
  console.log("put in last name");
  await p.waitForSelector('input[id="password"]');
  await p.type('input[id="password"]', 'botP@ssword1')
  console.log("put in password");
  await p.click('#submitBtn');
  console.log("clicked submitRegistration");
  await p.waitForTimeout(6000)
  const n = await p.$("#access-token")

  if (n) {
    const t = await (await n.getProperty('textContent')).jsonValue()
    console.log(t);
    console.log("SUCCESS WITH BOT")
  } else {
    const findResult = await p.$("[class='reactSingularKey_messageTextArea2 styles_messageTextArea2__35NkK ']")
    const text = await (await findResult.getProperty('textContent')).jsonValue()
    console.log(text)
  }

  await browser.close();
})

