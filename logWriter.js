const config = require('./config');
const cloudWatchLogs = require('./cloudWatchLogs');

class LogWriter {

	/**
	 * Constructor that starts logging scheduler.
	 */
	constructor() {
		this.queue = {};
		this.start();
	}

	/**
	 * Interval handler that writes messages from queue and clears it.
	 */
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

		cloudWatchLogs.write(messages);

		this.queue = {};
	}

	/**
	 * Adds given method for given appId
	 * @param {String} appId - Client application identifier
	 * @param {String} method - Identifies the API method
	 */
	log(appId, method) {
		const app = this.queue[appId] = this.queue[appId] || {};

		app[method] = (app[method] || 0) + 1;
	}
	/**
	 * Start logging scheduler
	 */
	start() {
		this.intervalId = setInterval(() => {
			this.flush();
		}, config.schedule.updateInterval);
	}

	/**
	 * Stops logging scheduler
	 */
	stop() {
		clearInterval(this.intervalId);
	}
}

module.exports = new LogWriter();