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

Example:

```
// Don't forget to start the selenium server in another tab!
{
var webdriverio = require('webdriverio'),
	client = webdriverio.remote({
		desiredCapabilities: { browserName: 'chrome' }
	});
 
client.init()
    .url('http://www.meetup.com/SoftwareTestingClub/events/224490861/')
	.getTitle()
	.then(x => console.log('The title was: ' + x))
    .end();
}
```

Some Examples from The Past
-----------------------------------


