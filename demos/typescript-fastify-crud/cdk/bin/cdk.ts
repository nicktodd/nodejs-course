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
  gitHubOwner: 'YOUR_GITHUB_USERNAME',     // Replace with your GitHub username
  gitHubRepo: 'YOUR_REPOSITORY_NAME',      // Replace with your repository name
  gitHubBranch: 'main',                    // Or your default branch
  codeStarConnectionArn: 'arn:aws:codestar-connections:eu-west-1:YOUR_ACCOUNT_ID:connection/CONNECTION_ID', // Replace with your CodeStar connection ARN
  existingCodeBuildProjectName: 'FastifyDeploymentDemo',
});