Non-Terrible UI tests with Selenium
===================================

Who Am I?
-----------------------------------

Rich.

JavaScript dev at Crunch (Accounting). Previously .NET dev at Acturis (Insurance).

Experienced with writing and maintaining low quality UI tests.


What is this talk about?
-----------------------------------

Why are UI tests usually so awful?

What can we do to make them better?

Questions for the audience
-----------------------------------

Who works with Software that has UI?

Who works with Web based UI?

Who has Automated tests for their Web based UI?

Who uses Selenium for their Automated tests?

Who thinks their tests could be better?

Who thinks their tests are terrible?

Guiding prinicples of UI tests
-----------------------------------

UI Tests should be:

* Fast
* Repeatable
* Independant
* Easy to understand
* Easy to maintain

What is Selenium?
-----------------------------------

A tool for automating web sites.

Commonly used for testing.

Works across browsers and devices.

Basic Examples
-----------------------------------

<script>
var webdriverio = require('webdriverio'),
	client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' } });
 
client.init()
    .url('http://www.meetup.com/SoftwareTestingClub/events/224490861/')
	.getTitle()
	.then(x => console.log('// The title was: ' + x))
    .end();
</script>

<script>
var webdriverio = require('webdriverio'),
	credentials = require('./credentials.js'),
	client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' } });
 
client.init()
    .url('https://secure.meetup.com/login/')
	.setValue('#email', credentials.email)
	.setValue('#password', credentials.password)
	.click('[name=submitButton]')
	.waitForVisible('#nav-profile', 5000)
    .url('http://www.meetup.com/SoftwareTestingClub/events/224490861/')
	.setValue('[name=newComment]', 'Hello from Selenium!')
	//.click('.j-submit-comment')
	.getTitle()
	.then(x => console.log('// ' + x))
    .end();
</script>

Already this is getting a bit terrible.

Really we just want to test that I can leave a comment, but first we have to log in.

Painting lines
-----------------------------------

Tell non-racist non-sexist joke.

"Real World" examples - insurance
-----------------------------------

Consider an insurance website:

http://www.comparethemarket.com/

(Other insurance websites are available)

### Simplest thing

> As a new user I want to get a quote for travel insurance so that I can decide whether to buy it.

* Go to https://travel.comparethemarket.com/PolicyDetails
* Fill in valid details
* Click get quotes
* Check that quotes eventually appear

### More complex

> As an existing user with saved quotes I want to be able to see my previous quotes so that I can come back later.

* Register for an account
* Somehow follow the link in the signup email???
* Log in
* Go to https://travel.comparethemarket.com/PolicyDetails
* Fill in valid details
* Click get quotes
* Check that quotes eventually appear
* Save quotes
* Log out
* Log back in
* Go to quotes page
* Check that quotes appear

### Ludicrous complexity

> As an existing user with an expired policy I want to be able to process a renewal so that I always have insurance.

* Register for an account
* Somehow follow the link in the signup email???
* Log in
* Go to https://travel.comparethemarket.com/PolicyDetails
* Fill in valid details
* Click get quotes
* Buy one of the quotes (use test card details I guess)
* Log out
* WAIT FOR POLICY TO EXPIRE
* Log back in
* Go to quotes page
* Check that quotes appear

"Real World" examples - accountancy 
-----------------------------------

"Test total export"

Tests that a client can export all of their data to Excel.

But... how does the data the test needs get populated?

In a similar vein: "Test popup appears after two minutes".

How do we resolve this?
----------------------------------- 

Get your developers to build a system that doesn't suck

### Ideal world

System is layered in a way that makes separating the front end from the back end easy

* Test the UI in total isolation from the back end. Mock all calls to the API
* Write a *few* true end-to-end tests to make sure the whole system works
* Consider mocking-out things like Authentication and Animations to make your life easier
* Example: AngularJS front end tested using Protractor
	
### Acceptable world

System is a monolith, but there's an easy, fast, programmatic way of setting up test state

* Each test (or suite of tests) is responsible for setting up and tearing down its own state
* Ideally use an API (REST or SOAP, whatever) for setting up state, failing that direct DB access is fine

### Terrible world

System is a monolith, no way of manipulating data except through the UI

* Things are going to be a nightmare.
* Try and avoid tests which:
** Can't be run without a separate setup step
** Tests that depend on other tests running first
** Tests that change state in a way that might break later tests
* Try and get your developers to build an API that you can use to set up state.
* Try to get your developers to build test-only features to turn off things like Authentication so you don't have to keep logging in.

How should we actually write tests?
-----------------------------------

If we separate out our data set up then our tests should be fast, repeatable and independant.

What about maintainable? What about understandable?

Writing automated tests is writing software. Writing software is hard. 

"Page Objects"
-----------------------------------

Idea is to separate knowledge of how to interact with the UI from the tests that describe what the UI should do.

Example from above:

<script>
class LoginPage {
	constructor (client) {
	}
}

const page = new LoginPage(client.init());
</script>

