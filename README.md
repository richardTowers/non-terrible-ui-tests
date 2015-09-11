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

Painting lines
-----------------------------------

Tell non-racist non-sexist joke.

"Real World" examples
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
* Check that quotes eventually appear
* Save quotes
* Log out
* WAIT FOR POLICY TO EXPIRE
* Log back in
* Go to quotes page
* Check that quotes appear

How do we resolve this?
----------------------------------- 

