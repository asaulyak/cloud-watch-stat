const scheduler = require('./scheduler');

module.exports = {

	log: (data) => {
		scheduler.queue(data);
	}
};