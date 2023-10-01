//PROTECT APP LOCATION
//--Perform Bot Attack against shared glitch application
// const baseUrl = 'https://cprice-p1-protect.ping-devops.com'

//--Perform Bot Attack against local deployment of PingOne Protect Application
const baseUrl = 'https://localhost:8080/'

//OS CONFIGURATION
//--MAC-Chrome-Browser-Path
const browserExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
//--Windows-Chrome-Browser-Path
// const browserExecutablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

//VISIBILITY
const browserHiddenSetting = false
// const browserHiddenSetting = true


const puppeteer = require('puppeteer-extra') 
 
// Add stealth plugin and use defaults 
const pluginStealth = require('puppeteer-extra-plugin-stealth')

const stealth = pluginStealth()
const {executablePath} = require('puppeteer'); 

console.log(stealth.availableEvasions);
puppeteer.use(stealth)

/*
// Stealth plugins are just regular `puppeteer-extra` plugins and can be added as such
const UserAgentOverride = require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
// Define custom UA and locale
const ua = UserAgentOverride({
  userAgent: 'MyFunkyUA/1.0',
  locale: 'de-DE,de'
})
puppeteer.use(ua)
*/


puppeteer.launch({ headless:browserHiddenSetting, ignoreHTTPSErrors:true, args: ['--no-sandbox', '--disable-blink-features=AutomationControlled', '--disable-web-security', '--disable-xss-auditor'], executablePath: browserExecutablePath}).then(async browser => {

  //browser new page
   const p = await browser.newPage();

   await p.setBypassCSP(true);

   //launch URL
   await p.goto(baseUrl)
   console.log("timeout started")
   await p.waitForTimeout(2000)
   console.log("timeout ended")
   

   // generate random email
   var randomnumber = Math.floor(Math.random() * (99999 - 100 + 1)) + 100;
   console.log(randomnumber)
   var randomemail = "reminator" + randomnumber + "@example.com";
   console.log(randomemail)
   await p.waitForSelector('input[id="username"]');
   await p.type('input[id="username"]',randomemail)

   //put in password
   await p.waitForSelector('input[id="password"]');
   await p.type('input[id="password"]','12345678!')

   //click button
   await p.click('#authenticate');
   console.log('authentication button selected');


   await p.waitForTimeout(30000)

   await browser.close();



})

