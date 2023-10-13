import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'getUserByEmail',
        cors: true,
        authorizer: {
          name: 'authorizer',
          'Fn::GetAtt': ['AuthorizerLambdaFunction', 'Arn'],
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token',
        },
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
