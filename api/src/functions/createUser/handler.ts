import dynamoDB from '../../libs/db';
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import * as bcrypt from 'bcryptjs';
import {middyfy} from "@libs/lambda";
import {createHttpResponse, defaultHeaders} from '../../helpers/httpResponses';
import {Cfg} from '../../constants';
import {ERROR_MESSAGES} from "../../helpers/errorMessages";
import {generateDynamoDBQueryParams} from "../../helpers/dynamoDBHelper";

interface IRequest {
    email: string;
    password: string;
}

export const createUser: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const requestBody: IRequest = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    const userEmail = requestBody.email;
    const userPassword = requestBody.password;

    const userExistsParams = generateDynamoDBQueryParams(Cfg.USERS_TABLE, {email: userEmail});

    try {
        const existingUser = await dynamoDB.get(userExistsParams).promise();

        if (existingUser.Item) {
            return createHttpResponse(409, {message: ERROR_MESSAGES.USER_ALREADY_EXISTS}, defaultHeaders());
        }
    } catch (error) {
        console.error(error);
        return createHttpResponse(500, {message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR}, defaultHeaders());
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = {
        email: userEmail,
        password: hashedPassword,
    };

    const putParams = {
        TableName: Cfg.USERS_TABLE,
        Item: newUser,
    };

    try {
        await dynamoDB.put(putParams).promise();
    } catch (error) {
        console.error(error);
        return createHttpResponse(500, {message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR}, defaultHeaders());
    }

    return createHttpResponse(201, {user: newUser}, defaultHeaders());
};

export const main = middyfy(createUser);
