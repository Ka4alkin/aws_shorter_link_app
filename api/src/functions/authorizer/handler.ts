import {CustomAuthorizerEvent, CustomAuthorizerResult, PolicyDocument} from 'aws-lambda';
import * as jwt from 'jsonwebtoken';
import {ERROR_MESSAGES} from "../../helpers/errorMessages";

const JWT_SECRET = process.env.JWT_SECRET;

export const authorizer = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult | void> => {
    try {
        const token = extractToken(event);
        const decoded = verifyToken(token, JWT_SECRET);
        return generatePolicy(decoded.email, 'Allow', event.methodArn);
    } catch (err) {
        console.error(`Authorization Error: ${err.message}`);
        return {
            principalId: 'user',
            policyDocument: generateEmptyPolicy(),
            context: {
                error: `Unauthorized: ${err.message}`,
            },
        };
    }
};

function extractToken(event: CustomAuthorizerEvent): string {
    if (!event.authorizationToken) {
        throw new Error(ERROR_MESSAGES.MISSING_AUTH_TOKEN);
    }

    const tokenParts = event.authorizationToken.split(' ');
    const bearerToken = tokenParts[1];

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer' || !bearerToken) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN_FORMAT);
    }

    return bearerToken;
}

function verifyToken(token: string, secret: string): jwt.JwtPayload {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string" || !decoded.email) {
        throw new Error(ERROR_MESSAGES.MISSING_EMAIL_IN_TOKEN);
    }

    return decoded as jwt.JwtPayload;
}

function generatePolicy(principalId: string, effect: string, resource: string): CustomAuthorizerResult {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }]
        }
    };
}

function generateEmptyPolicy(): PolicyDocument {
    return {
        Version: '2012-10-17',
        Statement: []
    };
}

export const main = authorizer;
