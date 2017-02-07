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
}

module.exports = new LogWriter();