const aws = require('aws-sdk');

class LogWriter {
	constructor() {
		this.cloudWatch = aws.CloudWatchLogs();
	}

	write(messages, appId, method) {
		this.getSequenceToken(appId, method)
			.then((data) => {
				this.cloudWatch.putLogEvents({
					logGroupName: appId,
					logStreamName: method,
					sequenceToken: data.sequenceToken,
					logEvents: messages
				});
			});
	}

	getSequenceToken(logGroupName, logStreamName) {
		return new Promise((resolve, reject) => {
			const token = this.tokens[logGroupName + logStreamName];
			if (token) {
				resolve({
					sequenceToken: token
				});
			}
			else {
				this.cloudWatch.describeLogStreams(options, (error, data) => {
					if (error) {
						reject(error);
					}
					else {
						const sequenceToken = logStreams[0].uploadSequenceToken;
						this.tokens[logGroupName + logStreamName] = sequenceToken;

						if (data.logStreams.length === 0) {
							this.createLogGroup(logGroupName)
								.then(() => {
									this.createLogStream(logGroupName, logStreamName);
								})
								.then(() => {
									resolve({
										sequenceToken: sequenceToken
									});
								});
						}
						else {
							resolve({
								sequenceToken: sequenceToken
							});
						}
					}
				});
			}
		});
	}

	createLogGroup(logGroupName) {
		return new Promise((resolve, reject) => {
			this.cloudWatch.createLogStream({
				logGroupName
			}, (error, data) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(data);
				}
			});
		});
	}

	createLogStream(logGroupName, logStreamName) {
		return new Promise((resolve, reject) => {
			this.cloudwatch.createLogStream({
				logGroupName,
				logStreamName
			}, (error, data) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(data);
				}
			});
		});
	}
}

module.exports = new LogWriter();