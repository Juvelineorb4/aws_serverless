import type { AWS } from '@serverless/typescript';

import coreSend from '@functions/coreSend';

const serverlessConfiguration: AWS = {
  service: 'cursosdev-appointment',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    //agg rol para comunacion entre lambda
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: ["lambda:InvokeFunction"],
          Resource: [
            "arn:aws:lambda:*:*:function:cursosdev-appointment-CO-dev-processor",
            "arn:aws:lambda:*:*:function:cursosdev-appointment-MX-dev-processor",
            "arn:aws:lambda:*:*:function:cursosdev-appointment-PE-dev-processor",
          ],
        },],
      }
    }
  },
  // import the function via paths
  functions: { coreSend },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
