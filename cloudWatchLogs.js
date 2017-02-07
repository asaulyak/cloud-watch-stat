const aws = require('aws-sdk');

class LogWriter {
	constructor() {
		this.cloudWatch = aws.CloudWatchLogs({apiVersion: '2010-08-01'});
	}

	write(messages) {
		messages.forEach((message) => {
			this.cloudWatch.putMetricData({
				MetricData: [
					{
						MetricName: 'MethodCalls',
						Dimensions: [
							{
								Name: 'Method',
								Value: message.method
							}
						],
						Timestamp: Date.now(),
						Unit: 'Count',
						Value: message.count
					}
				],
				Namespace: message.appId
			});
		});
	}

	read(appId, method, startDate, endDate) {
		return new Promise((resolve, reject) => {
			this.cloudWatch.getMetricStatistics({
					EndTime: endDate,
					MetricName: 'MethodCalls',
					Namespace: appId,
					Period: 0,
					StartTime: startDate,
					Dimensions: [
						{
							Name: 'Method',
							Value: method
						}
					],
					Unit: 'Count'
				},
				(error, data) => {
					if (error) {
						reject(error);
					}
					else {
						resolve(data.Datapoints);
					}
				});
		});
	}
}

module.exports = new LogWriter();