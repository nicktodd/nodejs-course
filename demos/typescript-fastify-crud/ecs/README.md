# Deploying Fastify CRUD API to AWS ECS

This guide walks you through deploying your Dockerized Fastify API to AWS ECS (Elastic Container Service) using AWS ECR (Elastic Container Registry) and Fargate.

## Prerequisites
- AWS CLI installed and configured
- Docker installed
- AWS account with permissions for ECS and ECR

## Steps

### 1. Build and Tag the Docker Image
```bash
docker build -t fastify-crud-api .
```

### 2. Create an ECR Repository
```bash
aws ecr create-repository --repository-name fastify-crud-api
```

### 3. Authenticate Docker to ECR
```bash
aws ecr get-login-password | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
```

### 4. Tag and Push the Image
```bash
docker tag fastify-crud-api:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/fastify-crud-api:latest
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/fastify-crud-api:latest
```

### 5. Create ECS Cluster
```bash
aws ecs create-cluster --cluster-name fastify-crud-cluster
```

### 6. Register Task Definition
- Use the provided `ecs-task-definition.json` as a template.
- Update `<aws_account_id>`, `<region>`, and image URI as needed.
```bash
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json
```

### 7. Create ECS Service
- Use the provided `ecs-service.json` as a template.
- Update cluster, task definition, and network settings.
```bash
aws ecs create-service --cli-input-json file://ecs-service.json
```

### 8. Access Your API
- Find the public IP or DNS of your ECS service (if using public subnets and a load balancer).
- The API will be available on port 3000.

---

## Artifacts
- `ecs-task-definition.json`: ECS task definition for Fargate
- `ecs-service.json`: ECS service definition

---

## Cleanup
To remove resources:
```bash
aws ecs delete-service --cluster fastify-crud-cluster --service fastify-crud-service --force
aws ecs delete-cluster --cluster fastify-crud-cluster
aws ecr delete-repository --repository-name fastify-crud-api --force
```
