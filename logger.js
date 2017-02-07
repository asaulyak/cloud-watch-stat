const config = require('./config');
const cloudWatchWriter = require('./cloudWatchWriter');

class Logger {
	constructor() {
		this.queue = [];
		this.start();
	}

	flush() {
		// TODO: Add CloudWatch API call here
		cloudWatchWriter.write(this.queue);
		this.queue = [];
	}

	log(data) {
		this.queue.push({
			timestamp: Date.now(),
			message: 'Method ${data.method} was called for app ${data.appId}'
		});
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