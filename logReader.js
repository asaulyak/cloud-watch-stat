const cloudWatchLogs = require('./cloudWatchLogs');
const moment = require('moment');

class LogReader {
	read(appId, method, startDate, endDate) {
		return cloudWatchLogs(appId, method, startDate, endDate)
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