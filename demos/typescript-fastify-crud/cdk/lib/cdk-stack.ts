import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';

export interface FastifyPipelineStackProps extends cdk.StackProps {
  gitHubOwner?: string;
  gitHubRepo?: string;
  gitHubBranch?: string;
  codeStarConnectionArn?: string;
}

export class FastifyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: FastifyPipelineStackProps) {
    super(scope, id, props);

    // Default values - you should update these in bin/cdk.ts
    const gitHubOwner = props?.gitHubOwner || 'YOUR_GITHUB_USERNAME';
    const gitHubRepo = props?.gitHubRepo || 'YOUR_REPOSITORY_NAME';
    const gitHubBranch = props?.gitHubBranch || 'main';
    const codeStarConnectionArn = props?.codeStarConnectionArn || 'arn:aws:codestar-connections:eu-west-1:YOUR_ACCOUNT_ID:connection/CONNECTION_ID';

    // Reference existing ECR Repository
    const ecrRepository = ecr.Repository.fromRepositoryName(this, 'FastifyApiRepository', 'fastify-crud-api');

    // VPC for ECS cluster
    const vpc = new ec2.Vpc(this, 'FastifyApiVpc', {
      maxAzs: 2,
      natGateways: 0, // No NAT gateways needed since ECS service will be in public subnet
    });

    // ECS Cluster
    const cluster = new ecs.Cluster(this, 'FastifyApiCluster', {
      vpc: vpc,
      clusterName: 'fastify-crud-cluster',
      containerInsights: true, // Using compatible property for older CDK version
    });

    // CloudWatch Log Group
    const logGroup = new logs.LogGroup(this, 'FastifyApiLogGroup', {
      logGroupName: '/ecs/fastify-crud-api',
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Task Definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'FastifyApiTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    // Container Definition
    const container = taskDefinition.addContainer('fastify-crud-api', {
      image: ecs.ContainerImage.fromEcrRepository(ecrRepository, 'latest'),
      logging: ecs.LogDriver.awsLogs({
        logGroup: logGroup,
        streamPrefix: 'fastify-api',
      }),
      portMappings: [
        {
          containerPort: 3000,
          protocol: ecs.Protocol.TCP,
        },
      ],
    });

    // ECS Service
    const service = new ecs.FargateService(this, 'FastifyApiService', {
      cluster: cluster,
      taskDefinition: taskDefinition,
      serviceName: 'fastify-crud-service',
      desiredCount: 1,
      assignPublicIp: true,
    });

    // CodeBuild artifacts
    const sourceOutput = new codepipeline.Artifact();
    const buildOutput = new codepipeline.Artifact();

    // Reference existing CodeBuild project
    const existingCodeBuildProject = codebuild.Project.fromProjectName(this, 'ExistingBuildProject', 'FastifyDeploymentDemo');

    // CodePipeline
    const pipeline = new codepipeline.Pipeline(this, 'FastifyApiPipeline', {
      pipelineName: 'FastifyApiPipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.CodeStarConnectionsSourceAction({
              actionName: 'GitHub_Source',
              owner: gitHubOwner,
              repo: gitHubRepo,
              branch: gitHubBranch,
              output: sourceOutput,
              connectionArn: codeStarConnectionArn,
            }),
          ],
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'Build',
              project: existingCodeBuildProject,
              input: sourceOutput,
              outputs: [buildOutput],
            }),
          ],
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipeline_actions.EcsDeployAction({
              actionName: 'Deploy',
              service: service,
              input: buildOutput,
            }),
          ],
        },
      ],
    });

    // Outputs
    new cdk.CfnOutput(this, 'ECRRepositoryURI', {
      value: ecrRepository.repositoryUri,
      description: 'ECR Repository URI',
    });

    new cdk.CfnOutput(this, 'ECSClusterName', {
      value: cluster.clusterName,
      description: 'ECS Cluster Name',
    });

    new cdk.CfnOutput(this, 'CodePipelineName', {
      value: pipeline.pipelineName,
      description: 'CodePipeline Name',
    });

    new cdk.CfnOutput(this, 'ArtifactsBucketArn', {
      value: pipeline.artifactBucket.bucketArn,
      description: 'Pipeline Artifacts Bucket ARN - Add this to CodeBuild service role permissions',
    });

    new cdk.CfnOutput(this, 'ArtifactsBucketName', {
      value: pipeline.artifactBucket.bucketName,
      description: 'Pipeline Artifacts Bucket Name',
    });

    new cdk.CfnOutput(this, 'PipelineEncryptionKeyArn', {
      value: pipeline.artifactBucket.encryptionKey?.keyArn || 'No encryption key found',
      description: 'KMS Key ARN for pipeline artifacts - Add kms:Decrypt permission to CodeBuild service role',
    });

    new cdk.CfnOutput(this, 'CodeBuildRoleInstructions', {
      value: 'Add S3 GetObject/PutObject AND kms:Decrypt permissions to codebuild-FastifyDeploymentDemo-service-role',
      description: 'Manual step: Update CodeBuild service role with S3 and KMS permissions',
    });
  }
}