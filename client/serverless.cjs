const clientServerlessConfiguration = {
  service: 'aws-react-client-test-2',
  frameworkVersion: '3',
  plugins: [
    'serverless-finch',
  ],
  provider: {
    name: 'aws',
    region: 'us-east-1',
  },
  custom: {
    client: {
      bucketName: 'react-link-app-bucket-name',
      distributionFolder: 'dist',
      indexDocument: 'index.html',
      errorDocument: 'error.html',
    },
  },
};

module.exports = clientServerlessConfiguration;
