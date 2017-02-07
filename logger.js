const config = require('./config');

class Logger {
	constructor () {
		this.queue = [];
		this.start();
	}

	flush() {
		// TODO: Add CloudWatch API call here
		this.queue = [];
	}

	log(data) {
		this.queue.push(data);
	}

	start() {
		this.intervalId = setInterval(() => {
			this.flush()
		}, config.schedule.updateInterval);
	}

	stop() {
		clearInterval(this.intervalId);
	}
}

module.exports = new Logger();