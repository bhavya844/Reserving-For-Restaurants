# Reserving for Restaurants

**Reserving for Restaurants** is a serverless restaurant reservation system designed to provide scalable, real-time booking capabilities. Built using AWS services, it efficiently handles reservation requests, notifications, and data storage while ensuring high fault tolerance and security.

## Features

- **Serverless Architecture**: Deployed using AWS Lambda, API Gateway, and DynamoDB for scalable and cost-effective operations.
- **Real-time Notifications**: Utilizes AWS SNS (Simple Notification Service) for instant reservation notifications.
- **Decoupled Processing**: Amazon SQS (Simple Queue Service) ensures reliable and fault-tolerant handling of reservation data.
- **Responsive Frontend**: Hosted on Amazon EC2, providing a seamless user experience with security group configurations for enhanced security.

## Technologies Used

- **AWS Lambda**: Executes serverless functions for reservation management and notifications.
- **Amazon API Gateway**: Manages API requests and routes them to Lambda functions.
- **DynamoDB**: Provides efficient data storage with quick retrieval capabilities for reservation data.
- **Amazon SNS**: Sends real-time notifications to customers and restaurant staff about reservation status.
- **Amazon SQS**: Handles reservation requests with decoupled, reliable processing and high fault tolerance.
- **Amazon EC2**: Hosts the front-end, secured with Virtual Private Cloud (VPC) configurations and security groups.
- **Security Groups**: Ensures network security and controlled access to backend systems.

## Installation

To set up this system, follow the steps below:

1. Clone this repository:

    ```bash
    git clone https://github.com/bhavya844/Reserving-For-Restaurants.git
    cd reserving-for-restaurants
    ```

2. Deploy the Lambda functions:

    - Create Lambda functions for reservation handling and notifications.
    - Link the functions to DynamoDB for data storage and Amazon SNS for real-time alerts.

3. Set up API Gateway:

    - Create REST APIs using Amazon API Gateway and link them to the Lambda functions for handling reservation requests.

4. Set up DynamoDB:

    - Create a DynamoDB table for storing reservation data with proper indexing and partition keys.

5. Configure Amazon SQS:

    - Set up an SQS queue to process incoming reservation requests asynchronously.

6. Deploy the Frontend:

    - Host the responsive frontend on Amazon EC2.
    - Configure VPC and security groups for secure communication between the frontend and backend.

## Usage

- **Make a Reservation**: Users can make restaurant reservations in real-time, receiving immediate confirmation via email or SMS.
- **Notifications**: Real-time notifications are sent to both customers and staff when reservations are made or modified.


