// Import the AWS SDK and uuid library
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');  // Import the v4 function from uuid to generate unique IDs

// Initialize the DynamoDB Document Client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Loop through each record in the event
        for (const record of event.Records) {
            // Parse the message body
            const messageBody = JSON.parse(record.body);

            // Generate a unique ID for the reservation
            const reservationId = uuidv4();

            // Define the parameters for the DynamoDB put operation
            const params = {
                TableName: 'Reservations',
                Item: {
                    id: reservationId,  // Add the generated ID
                    email: messageBody.email,
                    name: messageBody.name,
                    quantity: messageBody.quantity,
                    reservation_time: messageBody.reservation_time,
                    restaurant_name: messageBody.restaurant_name
                }
            };

            // Store the record in DynamoDB
            await dynamoDb.put(params).promise();
            console.log(`Successfully stored record for ${messageBody.email} with ID ${reservationId}`);
        }

        return { statusCode: 200, body: 'Successfully processed records' };
    } catch (error) {
        console.error(`Error processing records: ${error.message}`);
        return { statusCode: 500, body: 'Failed to process records' };
    }
};
