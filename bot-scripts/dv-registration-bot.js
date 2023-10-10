//PROTECT APP LOCATION
const baseUrl = 'http://bx.airlines:8888'

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

//LAUNCH BOT
puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled', '--disable-web-security', '--disable-xss-auditor'], executablePath: browserExecutablePath }).then(async browser => {

  //New Browser
  const p = await browser.newPage();
  await p.setBypassCSP(true);

  //GoTo URL
  await p.goto(baseUrl)
  await p.waitForTimeout(1500)

  //Generate Email
  var randomnumber = Math.floor(Math.random() * (99999 - 100 + 1)) + 100;
  var randomemail = "GGG-" + randomnumber + "@bot.com";
  console.log(randomemail)

  //Select Registration Button
  await p.click('#registerButton');
  console.log("clicked registerButton");
  await p.waitForSelector('input[id="email"]');

  //Populate Registration Page with User Details
  await p.waitForTimeout(1500)
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
  await p.waitForTimeout(1500)
  await p.click('#submitBtn');
  console.log("clicked submitRegistration");
  await p.waitForTimeout(6000)
  await browser.close();
})