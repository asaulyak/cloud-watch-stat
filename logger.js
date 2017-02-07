const config = require('./config');
const cloudWatchWriter = require('./cloudWatchLogs');

class Logger {
	constructor() {
		this.queue = {};
		this.start();
	}

	flush() {
		const messages = Object.keys(this.queue)
			.reduce((previous, current) => {
				previous.push.apply(previous, Object.keys(this.queue[current]).map((method) => {
					return {
						appId: current,
						method: method,
						count: this.queue[current][method]
					};
				}));

				return previous;
			}, []);

		cloudWatchWriter.write(messages);

		this.queue = {};
	}

	log(appId, method) {
		const app = this.queue[appId] = this.queue[appId] || {};

		app[method] = (app[method] || 0) + 1;
	}

	start() {
		this.intervalId = setInterval(() => {
			this.flush();
		}, config.schedule.updateInterval);
	}

	stop() {
		clearInterval(this.intervalId);
	}
}

module.exports = new Logger();