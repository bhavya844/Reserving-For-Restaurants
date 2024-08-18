// Import the AWS SDK
const AWS = require('aws-sdk');

// Initialize the SQS service
const sqs = new AWS.SQS();

// Retrieve the Queue URLs from environment variables
const queueUrl = process.env.QueueUrl;
const secondQueueUrl = process.env.SecondQueueUrl;

exports.handler = async (event) => {
  try {
    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);

    // Destructure the required fields from the request body
    const { name, email, quantity, reservation_time, restaurant_name } = requestBody;

    // Create a message object that you want to push into the SQS queues
    const message = {
      name: name,
      email: email,
      quantity: quantity,
      reservation_time: reservation_time,
      restaurant_name: restaurant_name,
    };

    // Define the parameters for the SQS messages for both queues
    const paramsFirstQueue = {
      MessageBody: JSON.stringify(message),
      QueueUrl: queueUrl,
    };

    const paramsSecondQueue = {
      MessageBody: JSON.stringify(message),
      QueueUrl: secondQueueUrl,
    };

    // Push the message into the first SQS queue
    const sendMessageToFirstQueue = sqs.sendMessage(paramsFirstQueue).promise();

    // Push the message into the second SQS queue
    const sendMessageToSecondQueue = sqs.sendMessage(paramsSecondQueue).promise();

    // Await both promises to ensure messages are sent
    await Promise.all([sendMessageToFirstQueue, sendMessageToSecondQueue]);

    // Return a successful response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message pushed to both SQS queues successfully' }),
    };
  } catch (error) {
    console.error('Error pushing message to SQS queues:', error);

    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error pushing message to SQS queues' }),
    };
  }
};
