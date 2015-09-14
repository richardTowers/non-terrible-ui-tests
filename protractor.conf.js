exports.config = {
	seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
	specs: ['/dev/stdin'],
	jasmineNodeOpts: { isVerbose: true, showColors: 0  },
	onPrepare: function () {
		global.credentials = require('./credentials.js');
		browser.ignoreSynchronization = true;
	},
	capabilities: {
		'browserName': 'chrome'
	}
};
