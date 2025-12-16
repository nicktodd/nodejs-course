#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FastifyPipelineStack } from '../lib/cdk-stack';

const app = new cdk.App();
new FastifyPipelineStack(app, 'FastifyPipelineStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: 'eu-west-1' 
  },
  // GitHub configuration - UPDATE THESE VALUES
  gitHubOwner: 'nicktodd',     // Replace with your GitHub username
  gitHubRepo: 'nodejs-course',      // Replace with your repository name
  gitHubBranch: 'master',                    // Or your default branch
  codeStarConnectionArn: "arn:aws:codeconnections:eu-west-1:149465616946:connection/0a306da5-0971-4bed-91e9-b904865cf959",
});