const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const sns = new AWS.SNS();

const snsTopicARN = process.env.SnsTopicArn;

exports.handler = async (event) => {
    try {
        // Check if event.Records is defined and has at least one entry
        if (!event.Records || event.Records.length === 0) {
            console.log('No records found in the event.');
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'No records to process.' }),
            };
        }

        // Process the single record
        const record = event.Records[0];
        const message = JSON.parse(record.body);

        const { name, email, quantity, reservation_time, restaurant_name } = message;

        // Subscribe to the topic if not already subscribed
        const subscribeParams = {
            TopicArn: snsTopicARN,
            Protocol: 'email',
            Endpoint: email,
            ReturnSubscriptionArn: true
        };

        try {
            // Check if already subscribed
            const subscribeResponse = await sns.subscribe(subscribeParams).promise();
            console.log(`Subscription successful: ${subscribeResponse.SubscriptionArn}`);
        } catch (subscribeError) {
            console.error('Error subscribing:', subscribeError);
        }

        const emailMessage = `Hello ${name}, Your reservation at ${restaurant_name} for ${reservation_time} has been booked successfully. You have booked ${quantity} seats.`;

        // Publish message to SNS
        const snsParams = {
            TopicArn: snsTopicARN,
            Message: emailMessage,
            Subject: "Reservation Confirmation"
        };

        await sns.publish(snsParams).promise();
        console.log('Message published to SNS successfully.');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent to SNS topic successfully' }),
        };
    } catch (error) {
        console.error('Error processing messages:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error processing messages' }),
        };
    }
};
