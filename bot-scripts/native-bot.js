//PROTECT APP LOCATION
const baseUrl = 'https://localhost:8080/'

//OS CONFIGURATION
const browserExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

//VISIBILITY
const browserHiddenSetting = false
 
//PUPPETEER SETUP
const puppeteer = require('puppeteer-extra') 
const pluginStealth = require('puppeteer-extra-plugin-stealth')
const stealth = pluginStealth()
const {executablePath} = require('puppeteer'); 
console.log(stealth.availableEvasions);
puppeteer.use(stealth)
const UserAgentOverride = require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
const ua = UserAgentOverride({
  userAgent: 'MyFunkyUA/1.0',
  locale: 'de-DE,de'
})
puppeteer.use(ua)

// LAUNCH BOT
puppeteer.launch({ headless:browserHiddenSetting, ignoreHTTPSErrors:true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled', '--disable-web-security', '--disable-xss-auditor'], executablePath: browserExecutablePath}).then(async browser => {

  //New Browser Page
   const p = await browser.newPage();
   await p.setBypassCSP(true);

   //Launch URL
   await p.goto(baseUrl)
   console.log("timeout started")
   await p.waitForTimeout(2000)
   console.log("timeout ended")

   //Generate Email
   var randomnumber = Math.floor(Math.random() * (99999 - 100 + 1)) + 100;
   console.log(randomnumber)
   var randomemail = "ggg" + randomnumber + "@example.com";
   console.log(randomemail)

   //Populate Username Field
   await p.waitForSelector('input[id="username"]');
   await p.type('input[id="username"]',randomemail)

   //Populate Password Field
   await p.waitForSelector('input[id="password"]');
   await p.type('input[id="password"]','12345678!')

   //Select Login Button
   await p.click('#authenticate');
   console.log('bot results');
   await p.waitForTimeout(10000);
   
   //Show Full Results
   await p.click('#fullResults');
   console.log('full evaluation results');
   await p.waitForTimeout(10000);
   
   //close browser
   await browser.close();
})