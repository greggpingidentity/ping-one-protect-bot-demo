# PingOne Protect Sample Bot Scripts

## Use Case 
These bot scripts demonstrate PingOne Protect's threat detection capabilities.

## Pre-Requesites
From the `bot-scripts` directory run the following command to install node dependencies

```code
npm install
```

## DaVinci Protect Implmementation
Run either the login or registration bots from the command line:

```code
node dv-login-bot.js
```
```code
node dv-registration-bot.js
```

## SDK Protect Implementation

### Run PingOne Protect Sample Application

In the command line, navigate to the `sdk-sample-app` directory and run:

```code
npm install
```
```code
npm start
```

Access the sample application at:
https://127.0.0.1:8080

View [http-server](https://www.npmjs.com/package/http-server) documentation for additional server options.

### Run Native Bot

Back in the `bot-scripts` directory run:

```code
node native-bot.js
```

# Disclaimer
THIS DEMO AND SAMPLE CODE IS PROVIDED "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL PING IDENTITY OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) SUSTAINED BY YOU OR A THIRD PARTY, HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT ARISING IN ANY WAY OUT OF THE USE OF THIS DEMO AND SAMPLE CODE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Bot scripts can be executed as:

node login-dv-bot.js
node registration-dv-bot.js
node bot-native.js