import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

interface FastifyPipelineStackProps extends cdk.StackProps {
  // GitHub configuration - required for CodeStar Connections
  gitHubOwner: string;
  gitHubRepo: string;
  gitHubBranch?: string;
  // CodeStar Connection ARN for GitHub App
  codeStarConnectionArn: string;
  // Existing CodeBuild project name
  existingCodeBuildProjectName?: string;
}

export class FastifyPipelineStack extends cdk.Stack {
  public readonly ecrRepository: ecr.Repository;
  public readonly ecsCluster: ecs.Cluster;
  public readonly fargateService: ecs.FargateService;

  constructor(scope: Construct, id: string, props?: FastifyPipelineStackProps) {
    super(scope, id, props);

    // ECR Repository for storing Docker images
    this.ecrRepository = new ecr.Repository(this, 'FastifyRepository', {
      repositoryName: 'fastify-crud-api',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For demo purposes
      autoDeleteImages: true, // For demo purposes
    });

    // VPC for ECS Cluster
    const vpc = new ec2.Vpc(this, 'FastifyVpc', {
      maxAzs: 2, // Use 2 AZs for high availability
      natGateways: 1, // Reduce costs for demo
    });

    // ECS Cluster
    this.ecsCluster = new ecs.Cluster(this, 'FastifyCluster', {
      clusterName: 'fastify-cluster',
      vpc: vpc,
      containerInsights: true,
    });

    // CloudWatch Log Group for the application
    const logGroup = new logs.LogGroup(this, 'FastifyLogGroup', {
      logGroupName: '/ecs/fastify-crud-api',
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Task Definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'FastifyTaskDefinition', {
      family: 'fastify-crud-task',
      memoryLimitMiB: 512,
      cpu: 256,
    });

    // Container Definition
    const container = taskDefinition.addContainer('fastify-crud-api', {
      image: ecs.ContainerImage.fromEcrRepository(this.ecrRepository, 'latest'),
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'ecs',
        logGroup: logGroup,
      }),
      environment: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    });

    container.addPortMappings({
      containerPort: 3000,
      protocol: ecs.Protocol.TCP,
    });

    // Fargate Service
    this.fargateService = new ecs.FargateService(this, 'FastifyService', {
      cluster: this.ecsCluster,
      taskDefinition: taskDefinition,
      serviceName: 'fastify-service',
      desiredCount: 1,
      assignPublicIp: true, // For demo purposes
    });

    // Use existing CodeBuild Project
    const buildProjectName = props?.existingCodeBuildProjectName || 'FastifyDeploymentDemo';
    const buildProject = codebuild.Project.fromProjectName(this, 'ExistingBuildProject', buildProjectName);

    // Pipeline Artifacts
    const sourceOutput = new codepipeline.Artifact('SourceOutput');
    const buildOutput = new codepipeline.Artifact('BuildOutput');

    // CodePipeline
    const pipeline = new codepipeline.Pipeline(this, 'FastifyPipeline', {
      pipelineName: 'fastify-deployment-pipeline',
      restartExecutionOnUpdate: true,
    });

    // Source Stage - GitHub with CodeStar Connections
    pipeline.addStage({
      stageName: 'Source',
      actions: [
        new codepipelineActions.CodeStarConnectionsSourceAction({
          actionName: 'GitHub_Source',
          owner: props!.gitHubOwner,
          repo: props!.gitHubRepo,
          branch: props?.gitHubBranch || 'main',
          connectionArn: props!.codeStarConnectionArn,
          output: sourceOutput,
        }),
      ],
    });

    // Build Stage
    pipeline.addStage({
      stageName: 'Build',
      actions: [
        new codepipelineActions.CodeBuildAction({
          actionName: 'CodeBuild',
          project: buildProject,
          input: sourceOutput,
          outputs: [buildOutput],
        }),
      ],
    });

    // Deploy Stage
    pipeline.addStage({
      stageName: 'Deploy',
      actions: [
        new codepipelineActions.EcsDeployAction({
          actionName: 'DeployToECS',
          service: this.fargateService,
          input: buildOutput,
        }),
      ],
    });

    // Note: The existing CodeBuild project 'FastifyDeploymentDemo' already has 
    // the necessary service role and ECR permissions configured

    // Outputs
    new cdk.CfnOutput(this, 'ECRRepositoryURI', {
      value: this.ecrRepository.repositoryUri,
      description: 'ECR Repository URI',
    });

    new cdk.CfnOutput(this, 'ECSClusterName', {
      value: this.ecsCluster.clusterName,
      description: 'ECS Cluster Name',
    });

    new cdk.CfnOutput(this, 'PipelineName', {
      value: pipeline.pipelineName,
      description: 'CodePipeline Name',
    });
  }
}
