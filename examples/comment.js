describe('Our Meetup page', function () {

	it('should leave a comment', function () {
	
		browser.get('https://secure.meetup.com/login/');

		element(by.id('email')).sendKeys(credentials.email);
		element(by.id('password')).sendKeys(credentials.password);

		element(by.name('submitButton')).click();

		browser.sleep(1000);

		browser.get('http://www.meetup.com/SoftwareTestingClub/events/224490861/');

		element(by.name('newComment')).sendKeys('Hello from Selenium!');

		// element(by.className('j-submit-comment')).click();
		
		browser.sleep(5000);

		expect(element(by.className('j-submit-comment')).isDisplayed()).toBe(true);
	});

});

