import { DynamoDB } from "aws-sdk";

const isOffline = process.env.IS_OFFLINE;

let dynamoDB;
if (isOffline) {
    /*dynamoDB = new DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    });*/
    dynamoDB = new DynamoDB.DocumentClient();
} else {
    dynamoDB = new DynamoDB.DocumentClient();
}

export default dynamoDB;
