describe('Our Meetup page', function () {

	it('should have the talk name in the title', function () {
		browser.get('http://www.meetup.com/SoftwareTestingClub/events/224490861/');
		expect(browser.getTitle())
			.toContain('Non-terrible browser UI tests with selenium');	
	});

});
