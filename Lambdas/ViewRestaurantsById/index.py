import json
import boto3
from decimal import Decimal

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Restaurant')
    print('event', event)

    # Extract the 'id' from the path parameters
    restaurant_id = event['pathParameters']['id']

    try:
        # Query DynamoDB for the item with the specific ID
        response = table.get_item(Key={'id': restaurant_id})

        # Check if the item was found
        if 'Item' in response:
            item = response['Item']
            # Convert the item to a JSON-serializable format
            serialized_item = json.dumps(item, default=decimal_to_float)

            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': serialized_item
            }
        else:
            # If no item is found, return a 404 response
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'message': 'Restaurant not found'})
            }
    except Exception as e:
        # Return a 500 response for any errors
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'message': 'Internal server error', 'error': str(e)})
        }

def decimal_to_float(obj):
    """
    Helper function to convert Decimal objects to float.
    """
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")
