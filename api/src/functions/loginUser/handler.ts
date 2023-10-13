import dynamoDB from '../../libs/db';
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {middyfy} from "@libs/lambda";
import {ERROR_MESSAGES} from "../../helpers/errorMessages";
import {createHttpResponse} from "../../helpers/httpResponses";
import {User} from "../../interfaces/User";
import {generateDynamoDBQueryParams} from "../../helpers/dynamoDBHelper";
import {Cfg} from "../../constants";

const JWT_SECRET = process.env.JWT_SECRET || '';

interface IRequest {
    email: string;
    password: string;
}

export const loginUser: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const body: IRequest = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    if (!body || !body.email || !body.password) {
        return createHttpResponse(400, {message: ERROR_MESSAGES.INVALID_REQUEST});
    }

    const userParams = generateDynamoDBQueryParams(Cfg.USERS_TABLE, {email: body.email});

    let userObject: User | undefined;

    try {
        const result = await dynamoDB.get(userParams).promise();
        userObject = result.Item as User;
    } catch (error) {
        console.error(error);
        return createHttpResponse(500, {message: ERROR_MESSAGES.UNKNOWN_ERROR});
    }

    if (!userObject) {
        return createHttpResponse(401, {message: ERROR_MESSAGES.INVALID_CREDENTIALS});
    }

    const valid = await bcrypt.compare(body.password, userObject.password);

    if (!valid) {
        return createHttpResponse(401, {message: ERROR_MESSAGES.INVALID_CREDENTIALS});
    }

    const token = jwt.sign({email: userObject.email}, JWT_SECRET, {expiresIn: '8h'});

    return createHttpResponse(200, {token, user: userObject});
};

export const main = middyfy(loginUser);
