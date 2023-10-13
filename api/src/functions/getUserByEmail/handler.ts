import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {createHttpResponse, defaultHeaders} from '../../helpers/httpResponses';
import {middyfy} from '@libs/lambda';
import schema from './schema';
import dynamoDB from "@libs/db";
import {User} from "../../interfaces/User";
import {Cfg} from "../../constants";
import {generateDynamoDBQueryParams} from '../../helpers/dynamoDBHelper';
import {ERROR_MESSAGES} from "../../helpers/errorMessages";

const fetchUserByEmail: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const requestBody = event.body;
    const userEmail = requestBody.email;

    const queryParams = generateDynamoDBQueryParams(Cfg.USERS_TABLE, {email: userEmail});

    let userObject: User | undefined;

    try {
        const result = await dynamoDB.get(queryParams).promise();
        userObject = result.Item as User;
    } catch (error) {
        return createHttpResponse(500, {message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR}, defaultHeaders());
    }

    if (!userObject) {
        return createHttpResponse(404, {message: ERROR_MESSAGES.USER_NOT_FOUND}, defaultHeaders());
    }

    return createHttpResponse(200, {user: userObject}, defaultHeaders());
};

export const main = middyfy(fetchUserByEmail);
