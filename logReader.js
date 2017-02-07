const cloudWatchLogs = require('./cloudWatchLogs');
const moment = require('moment');

class LogReader {

	/**
	 * Obtains metric filtered data from CloudWatch
	 * @param {String} appId - Client application identifier
	 * @param {String} method - Identifies the API method
	 * @param {Date} startDate - Date to start with
	 * @param {Date} endDate - Date to end with
	 * @returns {Promise<UsageStatistic[]>}
	 */
	read(appId, method, startDate, endDate) {
		return cloudWatchLogs.read(appId, method, startDate, endDate)
			.then((entries) => {
				return entries.map((item) => {
					return {
						method: method,
						count: item.Sum,
						date: moment(item.Timestamp).format('YYYY-MM-DD'),
						hour: new Date(item.Timestamp).getHours()
					};
				});
			});
	}
}

module.exports = new LogReader();