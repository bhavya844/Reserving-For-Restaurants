import json
import boto3
from decimal import Decimal

def handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Restaurant')
    response = table.scan()
    items = response['Items']
    
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])
    
    # Convert items to a JSON-serializable format
    serialized_items = json.dumps(items, default=decimal_to_float)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': serialized_items
    }

def decimal_to_float(obj):
    """
    Helper function to convert Decimal objects to float.
    """
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")
