# Fastify API CDK Deployment

This CDK stack deploys a Fastify API application to AWS ECS Fargate with a complete CI/CD pipeline using CodePipeline and your existing CodeBuild project.

## Prerequisites

1. **AWS CLI configured** with appropriate permissions
2. **CDK CLI installed**: `npm install -g aws-cdk`
3. **Existing CodeBuild project** named `FastifyDeploymentDemo`
4. **GitHub App connection** set up in AWS CodeStar Connections

## Configuration Required

Before deploying, you need to update the configuration in `bin/cdk.ts`:

### 1. GitHub Repository Information

```typescript
gitHubOwner: 'YOUR_GITHUB_USERNAME',     // Replace with your GitHub username
gitHubRepo: 'YOUR_REPOSITORY_NAME',      // Replace with your repository name
gitHubBranch: 'main',                    // Or your default branch
```

### 2. CodeStar Connection ARN

You need to find your existing CodeStar connection ARN. Run this AWS CLI command:

```bash
aws codestar-connections list-connections --region eu-west-1
```

Then update the `codeStarConnectionArn` in `bin/cdk.ts`:

```typescript
codeStarConnectionArn: 'arn:aws:codestar-connections:eu-west-1:YOUR_ACCOUNT_ID:connection/CONNECTION_ID'
```

## Deployment Steps

### 1. Install Dependencies

```bash
cd cdk
npm install
```

### 2. Bootstrap CDK (first time only)

```bash
npx cdk bootstrap --region eu-west-1
```

### 3. Update Configuration

Edit `bin/cdk.ts` with your actual GitHub repository details and CodeStar connection ARN.

### 4. Synthesize Stack (optional - for validation)

```bash
npx cdk synth
```

### 5. Deploy Stack

```bash
npx cdk deploy
```

## What This Stack Creates

- **ECR Repository**: For storing Docker images
- **VPC**: With 2 AZs and 1 NAT Gateway for cost optimization
- **ECS Fargate Cluster**: For running containerized applications
- **ECS Service**: Running the Fastify API
- **CloudWatch Log Group**: For application logging
- **CodePipeline**: 3-stage pipeline (Source → Build → Deploy)
  - **Source Stage**: GitHub via CodeStar Connections
  - **Build Stage**: Uses existing `FastifyDeploymentDemo` CodeBuild project
  - **Deploy Stage**: Deploys to ECS Fargate

## Pipeline Flow

1. **Source**: Triggers when code is pushed to the configured GitHub repository
2. **Build**: Uses your existing CodeBuild project to:
   - Build Docker image
   - Push to ECR repository
   - Generate deployment artifacts
3. **Deploy**: Updates ECS service with new Docker image

## Outputs

After deployment, the stack provides:
- ECR Repository URI
- ECS Cluster Name  
- CodePipeline Name

## Cleanup

To destroy the stack and all resources:

```bash
npx cdk destroy
```

## Troubleshooting

### Connection Issues
- Ensure your CodeStar connection is in "Available" status
- Verify the connection ARN is correct
- Check that your GitHub App has access to the repository

### Build Issues
- Verify your existing CodeBuild project `FastifyDeploymentDemo` has:
  - ECR push permissions
  - Proper buildspec.yml file
  - Docker build capability (privileged mode)

### ECS Deployment Issues
- Check CloudWatch logs in `/ecs/fastify-crud-api` log group
- Verify the Docker image builds successfully
- Ensure the container port (3000) is correctly configured

## CDK Useful Commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
