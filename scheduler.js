const config = require('./config');

class Scheduler {
	constructor () {
		this.queue = [];
		this.start();
	}

	flush() {
		// TODO: Add CloudWatch API call here
		this.queue = [];
	}

	enqueue(data) {
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

module.exports = new Scheduler();