import type { AWS } from '@serverless/typescript';
import getUserByEmail from '@functions/getUserByEmail';
import createUser from '@functions/createUser';
import loginUser from '@functions/loginUser';
import authorizer from "@functions/authorizer";

const awsAccountId: string = "664543349526";
const region: string = "us-east-1";
const tableName: string = "UsersTable";

const serverlessConfiguration: AWS = {
  service: 'aws-typescript-api',
  frameworkVersion: '3',
  plugins: [
      'serverless-esbuild',
      'serverless-finch',
      'serverless-dynamodb-local',
      'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      JWT_SECRET: 'your_jwt_secret'
    },
    iam: {
      role: {
          statements: [
              {
                  Effect: 'Allow',
                  Action: [
                      'dynamodb:DescribeTable',
                      'dynamodb:Query',
                      'dynamodb:Scan',
                      'dynamodb:GetItem',
                      'dynamodb:PutItem',
                      'dynamodb:UpdateItem',
                      'dynamodb:DeleteItem',
                  ],
                  Resource: `arn:aws:dynamodb:${region}:${awsAccountId}:table/${tableName}`,
              },
          ],
      },
    },
  },
  functions: {
    getUserByEmail,
    createUser,
    loginUser,
    authorizer,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
    watch: true,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    external: ['mock-aws-s3', 'nock']
    },
    client: {
      bucketName: 'react-link-app-bucket-name',
      distributionFolder: 'client/dist',
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      }
    }
  },
  resources: {
    Resources: {
        UsersTable: {
            Type: 'AWS::DynamoDB::Table',
            Properties: {
                TableName: 'UsersTable',
                AttributeDefinitions: [
                    {
                        AttributeName: 'email',
                        AttributeType: 'S'
                    }
                ],
                KeySchema: [
                    {
                        AttributeName: 'email',
                        KeyType: 'HASH'
                    }
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                },
                StreamSpecification: {
                    StreamViewType: 'NEW_AND_OLD_IMAGES'
                },
                SSESpecification: {
                    SSEEnabled: true
                },
                // todo make regarding settings
                // GlobalTableConfiguration: {
                //     ReplicationGroup: [
                //         {
                //             RegionName: "us-west-2"
                //         },
                //         {
                //             RegionName: "eu-central-1"
                //         }
                //     ]
                // }
            }
        }
    }
  }
};

module.exports = serverlessConfiguration;
