//PROTECT APP LOCATION
const baseUrl = 'http://localhost:8888'

//OS CONFIGURATION
const browserExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

//VISIBILITY
const browserHiddenSetting = false

//PUPPETEER SETUP
const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')
const stealth = pluginStealth()
const { executablePath } = require('puppeteer');
console.log(stealth.availableEvasions);
puppeteer.use(stealth)
const UserAgentOverride = require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
const ua = UserAgentOverride({
  userAgent: 'MyFunkyUA/1.0',
  locale: 'de-DE,de'
})
puppeteer.use(ua)

// LAUNCH BOT 
puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled', '--disable-web-security', '--disable-xss-auditor'], executablePath: browserExecutablePath }).then(async browser => {
  
  //New Browser Page
  const p = await browser.newPage();
  await p.setBypassCSP(true);

  //Launch URL
  await p.goto(baseUrl)
  console.log("timeout started")
  await p.waitForTimeout(3000)
  console.log("timeout ended")

  //Generate Email
  var randomnumber = Math.floor(Math.random() * (99999 - 100 + 1)) + 100;
  var randomemail = "GGG" + randomnumber + "@example.com";
  console.log(randomemail)

  //Select Login Button
  await p.click('#loginButton');
  console.log("clicked loginButton");
  await p.waitForTimeout(3000)
  await p.waitForSelector('input[id="username"]');

  //Populate Login Page with User Details
  await p.type('input[id="username"]', "greggdiamant@pingone.com")
  await p.click('#btnSignIn');
  console.log("clicked signIn");
  await p.waitForTimeout(3000);
  await p.waitForSelector('input[id="password"]');
  await p.type('input[id="password"]', 'botP@ssword1')
  console.log("entered password");
  await p.click('#submitBtn');
  console.log("submitted password");
  await p.waitForTimeout(6000)
  await browser.close();
})