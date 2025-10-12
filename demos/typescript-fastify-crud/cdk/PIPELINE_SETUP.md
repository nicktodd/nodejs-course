# Fastify CDK Pipeline Setup

This CDK application creates a complete CI/CD pipeline for deploying your Fastify application to ECS Fargate.

## Architecture

The stack creates:

1. **ECR Repository** - Stores Docker images (`fastify-crud-api`)
2. **VPC** - Network infrastructure with 2 AZs
3. **ECS Cluster** - Fargate cluster for running containers
4. **ECS Service** - Runs your Fastify application on port 3000
5. **CodePipeline** - Automates deployment process
   - Source Stage: Pulls from your Git repository
   - Build Stage: Uses your existing CodeBuild project (`FastifyDeploymentDemo`)
   - Deploy Stage: Deploys to ECS Fargate

## Prerequisites

Before deploying, you need to configure:

### 1. Source Repository Configuration

Update the pipeline source in `lib/cdk-stack.ts`:

**For GitHub:**
```typescript
new codepipelineActions.GitHubSourceAction({
  actionName: 'GitHub_Source',
  owner: 'YOUR_GITHUB_USERNAME',
  repo: 'YOUR_REPO_NAME',
  branch: 'main',
  oauthToken: cdk.SecretValue.secretsManager('github-token'),
  output: sourceOutput,
}),
```

**For CodeCommit:**
```typescript
new codepipelineActions.CodeCommitSourceAction({
  actionName: 'CodeCommit_Source',
  repository: codecommit.Repository.fromRepositoryName(this, 'Repo', 'your-repo-name'),
  output: sourceOutput,
}),
```

### 2. GitHub Token (if using GitHub)

Create a secret in AWS Secrets Manager:
```bash
aws secretsmanager create-secret \
  --name github-token \
  --secret-string "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN" \
  --region eu-west-1
```

### 3. CodeBuild Project

Your existing CodeBuild project `FastifyDeploymentDemo` will be used. Ensure it has:
- ECR permissions to push/pull images
- The buildspec.yml is configured correctly (✅ already done)

## Deployment

1. **Bootstrap CDK (if not done already):**
   ```bash
   cdk bootstrap --region eu-west-1
   ```

2. **Deploy the stack:**
   ```bash
   cdk deploy
   ```

3. **Update your buildspec.yml path (if needed):**
   The current buildspec expects the Dockerfile in `./demos/typescript-fastify-crud/`

## Configuration Notes

- **Region**: Set to `eu-west-1` as requested
- **Container Resources**: 512 MiB memory, 256 CPU units
- **Networking**: Service has public IP for demo purposes
- **Logging**: CloudWatch logs in `/ecs/fastify-crud-api`
- **Desired Count**: 1 instance (can be scaled up)

## Customization Options

You can customize the deployment by modifying the stack constructor:

```typescript
new FastifyPipelineStack(app, 'FastifyPipelineStack', {
  env: { region: 'eu-west-1' },
  gitHubOwner: 'your-username',
  gitHubRepo: 'your-repo',
  gitHubBranch: 'main'
});
```

## Outputs

After deployment, you'll get:
- ECR Repository URI
- ECS Cluster Name  
- CodePipeline Name

## Next Steps

1. Configure your source repository details
2. Create GitHub token secret (if using GitHub)
3. Deploy with `cdk deploy`
4. Push code changes to trigger the pipeline

## Pipeline Flow

1. **Code Push** → Triggers pipeline
2. **Source Stage** → Downloads code
3. **Build Stage** → Builds Docker image, pushes to ECR
4. **Deploy Stage** → Updates ECS service with new image

The pipeline will automatically deploy your Fastify application whenever you push changes to your configured branch.
