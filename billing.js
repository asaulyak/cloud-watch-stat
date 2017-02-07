/**
 * API Usage Billing
 * @module billing
 */

const logger = require('./logger');

module.exports = {
	/**
	 * Date String Representation in YYYY-MM-DD format
	 * @typedef {string} DateString
	 */

	/**
	 * Usage Statistic Line Item
	 * @typedef {Object} UsageStatistic
	 * @property {string} method - The aggregate method
	 * @property {DateString} date - The aggregate date
	 * @property {number} hour - The aggregate hour (24h)
	 * @property {number} count - The number of calls to the given method in the given date/hour
	 */

	/**
	 * Logs billable usage for the given appId and method
	 * Requests are buffered and only sent once every 5 seconds (to reduce network traffic)
	 * @param {string} appId - Identifies the consuming client application
	 * @param {string} method - Identifies the API method
	 */
	log: (appId, method) => {
		//You will need to decide the best way to utilise the CloudWatch API e.g. namespaces, dimensions, metricName, units, etc
		logger.log({
			appId,
			method
		});
	},

	/**
	 * Returns (via Promise) billable usage statistics for the given appId and method
	 * @param {String} appId - Identifies the consuming client application
	 * @param {String} [method] - Identifies the API method (if omitted, returns results for all methods)
	 * @param {DateString} [startDate] - Defaults to today - 30 days
	 * @param {DateString} [endDate] - Defaults to today
	 * @return {Promise<UsageStatistic[]>}
	 */
	getStats: (appId, method, startDate, endDate) => {
		//Should only make a single request to CloudWatch regardless of input
	},
}