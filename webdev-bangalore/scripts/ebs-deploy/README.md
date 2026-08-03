# PixelCraft Studio - AWS Elastic Beanstalk Deploy Scripts

Deploys all microservices to AWS Elastic Beanstalk with managed
RDS MySQL, ElastiCache Redis, and MSK Kafka.

---

## Architecture on AWS

```
Internet
    |
  Route 53  (your domain)
    |
  EB Load Balancer  (per service)
    |
  +-----------+  +-----------+  +-----------+  +-----------+
  | Frontend  |  | API GW    |  | User Svc  |  | ...       |
  | EB Env    |  | EB Env    |  | EB Env    |  | EB Envs   |
  +-----------+  +-----------+  +-----------+  +-----------+
        |               |              |
        +---------------+--------------+
                        |
              Private Subnet (VPC)
                        |
          +-------------+-------------+
          |             |             |
       RDS MySQL   ElastiCache    MSK Kafka
       (db.t3)    Redis (t3)    (3 brokers)
```

Each service runs in its **own EB application + environment**.
All infrastructure (VPC, RDS, Redis, Kafka) is provisioned by a
single CloudFormation stack.

---

## Files

| Script | Purpose |
|--------|---------|
| `config.sh` | **Edit this first.** All settings live here. |
| `deploy-all.sh` | Master script - runs everything end to end |
| `01-infra.sh` | CloudFormation: VPC, RDS, Redis, MSK, SGs |
| `01b-init-mysql.sh` | Create MySQL databases (run once, needs VPC access) |
| `02-build-push.sh` | Build Docker images + push to ECR |
| `03-deploy-services.sh` | Create/update EB apps and environments |
| `redeploy.sh` | Rebuild + redeploy a single service |
| `status.sh` | Show status of all EB environments |
| `logs.sh` | Fetch logs from any EB environment |
| `destroy.sh` | Tear down ALL AWS resources |

---

## Prerequisites

```bash
# 1. AWS CLI v2
https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

# 2. Configure credentials
aws configure
# Enter: Access Key, Secret Key, Region (ap-south-1), output (json)

# 3. EB CLI
pip install awsebcli

# 4. Docker (running)
https://docs.docker.com/get-docker/

# 5. jq
https://stedolan.github.io/jq/
```

---

## Quick Start

### Step 1 - Edit config.sh

```bash
# Minimum changes required:
AWS_REGION="ap-south-1"       # your preferred region
RDS_PASSWORD="StrongPass@123" # CHANGE THIS
EB_KEY_PAIR="my-key-pair"     # optional, for SSH access
```

### Step 2 - Deploy everything

```bash
cd ebs-deploy/
chmod +x *.sh
bash deploy-all.sh
```

This takes **~25-30 minutes** on first run (MSK + RDS provisioning).

### Step 3 - Initialise MySQL (once only)

After infra is up, run from a machine with VPC access
(bastion host, or temporarily whitelist your IP on the RDS SG):

```bash
bash 01b-init-mysql.sh
```

### Step 4 - Check status

```bash
bash status.sh           # one-time check
bash status.sh --watch   # refresh every 30s until all green
```

---

## Day-to-Day Commands

```bash
# Redeploy a single service after code changes
bash redeploy.sh user-service
bash redeploy.sh frontend

# Redeploy all services
bash redeploy.sh all

# View logs
bash logs.sh user-service
bash logs.sh audit-service --tail

# Check all environment health
bash status.sh

# Tear everything down (IRREVERSIBLE)
bash destroy.sh
```

---

## Cost Estimate (ap-south-1, running 24/7)

| Resource | Type | ~Monthly Cost |
|----------|------|--------------|
| 7x EB Environments | t3.small | ~$110 |
| RDS MySQL | db.t3.micro | ~$15 |
| ElastiCache Redis | cache.t3.micro | ~$12 |
| MSK Kafka | kafka.t3.small x3 | ~$80 |
| Data transfer + S3 | - | ~$5 |
| **Total** | | **~$222/month** |

For dev/test, switch all instance types to micro in `config.sh`.
For production, enable `RDS_MULTI_AZ=true` and increase instance sizes.

---

## Troubleshooting

**EB environment stuck in "Updating"**
```bash
bash logs.sh <service-name>
```

**MySQL connection refused**
- Check RDS SG allows traffic from AppSG (10.0.0.0/16)
- Verify `RDS_PASSWORD` in config.sh matches what was used during stack creation

**Kafka/MSK not connecting**
- MSK takes ~20 min to provision; check `bash status.sh`
- Verify `/${APP_NAME}/${ENV_NAME}/msk-brokers` in SSM Parameter Store

**ECR pull error on EB**
- Ensure `aws-elasticbeanstalk-ec2-role` has `AmazonEC2ContainerRegistryReadOnly`
- This is done automatically by `03-deploy-services.sh`
