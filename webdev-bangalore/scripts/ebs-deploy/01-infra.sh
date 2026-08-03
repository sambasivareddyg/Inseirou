#!/usr/bin/env bash
# =============================================================================
#  01-infra.sh
#  Provisions shared AWS infrastructure via CloudFormation:
#    - VPC with public + private subnets across 2 AZs
#    - Security Groups
#    - RDS MySQL 8
#    - ElastiCache Redis
#    - MSK (Managed Kafka)
#    - SSM Parameter Store entries (connection strings for EB env vars)
# =============================================================================

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/config.sh"

R='\033[0;31m'; G='\033[0;32m'; Y='\033[1;33m'; C='\033[0;36m'; B='\033[1m'; N='\033[0m'
ok()   { echo -e "${G}[OK]${N}   $*"; }
info() { echo -e "${C}[INFO]${N} $*"; }
step() { echo -e "\n${B}===> $*${N}"; }

# ── Write CloudFormation template ─────────────────────────────────────────────
CF_TEMPLATE="/tmp/${APP_NAME}-infra.yaml"

cat > "$CF_TEMPLATE" << 'CFEOF'
AWSTemplateFormatVersion: '2010-09-09'
Description: PixelCraft Studio - Shared Infrastructure (VPC, RDS, Redis, MSK)

Parameters:
  AppName:        { Type: String }
  EnvName:        { Type: String }
  RdsPassword:    { Type: String, NoEcho: true }
  RdsUsername:    { Type: String }
  RdsDbName:      { Type: String }
  RdsClass:       { Type: String }
  RdsMultiAz:     { Type: String }
  RdsStorage:     { Type: Number }
  RedisNodeType:  { Type: String }
  RedisReplicas:  { Type: Number }
  MskBrokerType:  { Type: String }
  MskBrokerCount: { Type: Number }
  MskVersion:     { Type: String }
  MskStorage:     { Type: Number }

Resources:

  # ── VPC ─────────────────────────────────────────────────────────────────────
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
      Tags: [ { Key: Name, Value: !Sub "${AppName}-${EnvName}-vpc" } ]

  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags: [ { Key: Name, Value: !Sub "${AppName}-${EnvName}-igw" } ]

  IGWAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref InternetGateway

  # Public subnets (EB environments, NAT gateways)
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [ 0, !GetAZs "" ]
      MapPublicIpOnLaunch: true
      Tags: [ { Key: Name, Value: !Sub "${AppName}-public-1" } ]

  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [ 1, !GetAZs "" ]
      MapPublicIpOnLaunch: true
      Tags: [ { Key: Name, Value: !Sub "${AppName}-public-2" } ]

  # Private subnets (RDS, Redis, MSK)
  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.11.0/24
      AvailabilityZone: !Select [ 0, !GetAZs "" ]
      Tags: [ { Key: Name, Value: !Sub "${AppName}-private-1" } ]

  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.12.0/24
      AvailabilityZone: !Select [ 1, !GetAZs "" ]
      Tags: [ { Key: Name, Value: !Sub "${AppName}-private-2" } ]

  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC

  PublicRoute:
    Type: AWS::EC2::Route
    DependsOn: IGWAttachment
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref InternetGateway

  PubSubnet1RT: { Type: AWS::EC2::SubnetRouteTableAssociation, Properties: { SubnetId: !Ref PublicSubnet1, RouteTableId: !Ref PublicRouteTable } }
  PubSubnet2RT: { Type: AWS::EC2::SubnetRouteTableAssociation, Properties: { SubnetId: !Ref PublicSubnet2, RouteTableId: !Ref PublicRouteTable } }

  # ── Security Groups ──────────────────────────────────────────────────────────
  AppSG:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: EB application instances
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - { IpProtocol: tcp, FromPort: 80,   ToPort: 80,   CidrIp: 0.0.0.0/0 }
        - { IpProtocol: tcp, FromPort: 443,  ToPort: 443,  CidrIp: 0.0.0.0/0 }
        - { IpProtocol: tcp, FromPort: 8080, ToPort: 8090, CidrIp: 10.0.0.0/16 }
      Tags: [ { Key: Name, Value: !Sub "${AppName}-app-sg" } ]

  RdsSG:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: RDS MySQL access
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - { IpProtocol: tcp, FromPort: 3306, ToPort: 3306, SourceSecurityGroupId: !Ref AppSG }
      Tags: [ { Key: Name, Value: !Sub "${AppName}-rds-sg" } ]

  RedisSG:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: ElastiCache Redis access
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - { IpProtocol: tcp, FromPort: 6379, ToPort: 6379, SourceSecurityGroupId: !Ref AppSG }
      Tags: [ { Key: Name, Value: !Sub "${AppName}-redis-sg" } ]

  MskSG:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: MSK Kafka access
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - { IpProtocol: tcp, FromPort: 9092, ToPort: 9092, SourceSecurityGroupId: !Ref AppSG }
        - { IpProtocol: tcp, FromPort: 9094, ToPort: 9094, SourceSecurityGroupId: !Ref AppSG }
      Tags: [ { Key: Name, Value: !Sub "${AppName}-msk-sg" } ]

  # ── RDS MySQL ────────────────────────────────────────────────────────────────
  RdsSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupDescription: RDS subnet group
      SubnetIds: [ !Ref PrivateSubnet1, !Ref PrivateSubnet2 ]

  RdsInstance:
    Type: AWS::RDS::DBInstance
    DeletionPolicy: Snapshot
    Properties:
      DBInstanceIdentifier: !Sub "${AppName}-${EnvName}-mysql"
      DBInstanceClass: !Ref RdsClass
      Engine: mysql
      EngineVersion: "8.0"
      MasterUsername: !Ref RdsUsername
      MasterUserPassword: !Ref RdsPassword
      DBName: !Ref RdsDbName
      AllocatedStorage: !Ref RdsStorage
      StorageType: gp3
      StorageEncrypted: true
      MultiAZ: !Ref RdsMultiAz
      DBSubnetGroupName: !Ref RdsSubnetGroup
      VPCSecurityGroups: [ !Ref RdsSG ]
      BackupRetentionPeriod: 7
      DeletionProtection: false
      Tags: [ { Key: Name, Value: !Sub "${AppName}-${EnvName}-mysql" } ]

  # ── ElastiCache Redis ────────────────────────────────────────────────────────
  RedisSubnetGroup:
    Type: AWS::ElastiCache::SubnetGroup
    Properties:
      Description: Redis subnet group
      SubnetIds: [ !Ref PrivateSubnet1, !Ref PrivateSubnet2 ]

  RedisCluster:
    Type: AWS::ElastiCache::ReplicationGroup
    Properties:
      ReplicationGroupDescription: !Sub "${AppName} Redis"
      ReplicationGroupId: !Sub "${AppName}-${EnvName}-redis"
      CacheNodeType: !Ref RedisNodeType
      Engine: redis
      EngineVersion: "7.1"
      NumCacheClusters: !If [ IsSingleNode, 1, !Ref RedisReplicas ]
      AutomaticFailoverEnabled: !If [ IsSingleNode, false, true ]
      CacheSubnetGroupName: !Ref RedisSubnetGroup
      SecurityGroupIds: [ !Ref RedisSG ]
      AtRestEncryptionEnabled: true
      TransitEncryptionEnabled: false
      Tags: [ { Key: Name, Value: !Sub "${AppName}-${EnvName}-redis" } ]

  # ── MSK (Managed Kafka) ──────────────────────────────────────────────────────
  MskCluster:
    Type: AWS::MSK::Cluster
    Properties:
      ClusterName: !Sub "${AppName}-${EnvName}-kafka"
      KafkaVersion: !Ref MskVersion
      NumberOfBrokerNodes: !Ref MskBrokerCount
      BrokerNodeGroupInfo:
        InstanceType: !Ref MskBrokerType
        ClientSubnets: [ !Ref PrivateSubnet1, !Ref PrivateSubnet2, !Ref PrivateSubnet1 ]
        SecurityGroups: [ !Ref MskSG ]
        StorageInfo:
          EBSStorageInfo:
            VolumeSize: !Ref MskStorage
      EncryptionInfo:
        EncryptionInTransit:
          ClientBroker: TLS_PLAINTEXT
          InCluster: true
      EnhancedMonitoring: DEFAULT
      Tags:
        Name: !Sub "${AppName}-${EnvName}-kafka"

  # ── SSM Parameters (read by 03-deploy-services.sh) ──────────────────────────
  ParamVpcId:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/${AppName}/${EnvName}/vpc-id"
      Type: String
      Value: !Ref VPC

  ParamPublicSubnet1:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/${AppName}/${EnvName}/public-subnet-1"
      Type: String
      Value: !Ref PublicSubnet1

  ParamPublicSubnet2:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/${AppName}/${EnvName}/public-subnet-2"
      Type: String
      Value: !Ref PublicSubnet2

  ParamAppSG:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/${AppName}/${EnvName}/app-sg"
      Type: String
      Value: !Ref AppSG

  ParamRdsEndpoint:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/${AppName}/${EnvName}/rds-endpoint"
      Type: String
      Value: !GetAtt RdsInstance.Endpoint.Address

  ParamRedisEndpoint:
    Type: AWS::SSM::Parameter
    Properties:
      Name: !Sub "/${AppName}/${EnvName}/redis-endpoint"
      Type: String
      Value: !GetAtt RedisCluster.PrimaryEndPoint.Address

Conditions:
  IsSingleNode: !Equals [ !Ref RedisReplicas, 0 ]

Outputs:
  VpcId:          { Value: !Ref VPC,                                    Export: { Name: !Sub "${AppName}-${EnvName}-vpc-id" } }
  PublicSubnet1:  { Value: !Ref PublicSubnet1,                          Export: { Name: !Sub "${AppName}-${EnvName}-pub-subnet-1" } }
  PublicSubnet2:  { Value: !Ref PublicSubnet2,                          Export: { Name: !Sub "${AppName}-${EnvName}-pub-subnet-2" } }
  AppSG:          { Value: !Ref AppSG,                                  Export: { Name: !Sub "${AppName}-${EnvName}-app-sg" } }
  RdsEndpoint:    { Value: !GetAtt RdsInstance.Endpoint.Address,        Export: { Name: !Sub "${AppName}-${EnvName}-rds-endpoint" } }
  RedisEndpoint:  { Value: !GetAtt RedisCluster.PrimaryEndPoint.Address, Export: { Name: !Sub "${AppName}-${EnvName}-redis-endpoint" } }
CFEOF

# ── Deploy / update stack ─────────────────────────────────────────────────────
step "Deploying CloudFormation stack: $CF_STACK_NAME"

STACK_EXISTS=$(aws cloudformation describe-stacks \
  --stack-name "$CF_STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].StackStatus" \
  --output text 2>/dev/null || echo "DOES_NOT_EXIST")

CF_PARAMS=(
  "ParameterKey=AppName,ParameterValue=$APP_NAME"
  "ParameterKey=EnvName,ParameterValue=$ENV_NAME"
  "ParameterKey=RdsPassword,ParameterValue=$RDS_PASSWORD"
  "ParameterKey=RdsUsername,ParameterValue=$RDS_USERNAME"
  "ParameterKey=RdsDbName,ParameterValue=$RDS_DB_NAME"
  "ParameterKey=RdsClass,ParameterValue=$RDS_INSTANCE_CLASS"
  "ParameterKey=RdsMultiAz,ParameterValue=$RDS_MULTI_AZ"
  "ParameterKey=RdsStorage,ParameterValue=$RDS_STORAGE_GB"
  "ParameterKey=RedisNodeType,ParameterValue=$REDIS_NODE_TYPE"
  "ParameterKey=RedisReplicas,ParameterValue=$REDIS_NUM_REPLICAS"
  "ParameterKey=MskBrokerType,ParameterValue=$MSK_BROKER_TYPE"
  "ParameterKey=MskBrokerCount,ParameterValue=$MSK_BROKER_COUNT"
  "ParameterKey=MskVersion,ParameterValue=$MSK_KAFKA_VERSION"
  "ParameterKey=MskStorage,ParameterValue=$MSK_STORAGE_GB"
)

if [[ "$STACK_EXISTS" == "DOES_NOT_EXIST" ]]; then
  info "Creating new stack..."
  aws cloudformation create-stack \
    --stack-name "$CF_STACK_NAME" \
    --template-body "file://$CF_TEMPLATE" \
    --parameters "${CF_PARAMS[@]}" \
    --capabilities CAPABILITY_IAM \
    --region "$AWS_REGION"
else
  info "Updating existing stack..."
  aws cloudformation update-stack \
    --stack-name "$CF_STACK_NAME" \
    --template-body "file://$CF_TEMPLATE" \
    --parameters "${CF_PARAMS[@]}" \
    --capabilities CAPABILITY_IAM \
    --region "$AWS_REGION" 2>/dev/null || info "Stack already up to date."
fi

info "Waiting for stack to complete (RDS + MSK can take 15-25 minutes)..."
aws cloudformation wait stack-create-complete \
  --stack-name "$CF_STACK_NAME" \
  --region "$AWS_REGION" 2>/dev/null || \
aws cloudformation wait stack-update-complete \
  --stack-name "$CF_STACK_NAME" \
  --region "$AWS_REGION" 2>/dev/null || true

# ── Read outputs ──────────────────────────────────────────────────────────────
step "Reading stack outputs"

get_output() {
  aws cloudformation describe-stacks \
    --stack-name "$CF_STACK_NAME" \
    --region "$AWS_REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" \
    --output text
}

RDS_HOST=$(get_output RdsEndpoint)
REDIS_HOST=$(get_output RedisEndpoint)
VPC_ID=$(get_output VpcId)

# ── Store in SSM ──────────────────────────────────────────────────────────────
# MSK bootstrap brokers (available only after cluster is ACTIVE)
info "Fetching MSK bootstrap brokers..."
MSK_CLUSTER_ARN=$(aws kafka list-clusters \
  --region "$AWS_REGION" \
  --query "ClusterInfoList[?ClusterName=='${APP_NAME}-${ENV_NAME}-kafka'].ClusterArn" \
  --output text)

if [[ -n "$MSK_CLUSTER_ARN" ]]; then
  MSK_BROKERS=$(aws kafka get-bootstrap-brokers \
    --cluster-arn "$MSK_CLUSTER_ARN" \
    --region "$AWS_REGION" \
    --query "BootstrapBrokerString" \
    --output text)

  aws ssm put-parameter \
    --name "/${APP_NAME}/${ENV_NAME}/msk-brokers" \
    --value "$MSK_BROKERS" \
    --type String \
    --overwrite \
    --region "$AWS_REGION"
  ok "MSK Brokers: $MSK_BROKERS"
fi

ok "RDS Endpoint : $RDS_HOST"
ok "Redis Host   : $REDIS_HOST"
ok "VPC ID       : $VPC_ID"

# ── Initialise MySQL databases ────────────────────────────────────────────────
step "Initialising MySQL databases"
info "NOTE: This requires MySQL client on this machine and RDS SG to allow your IP."
info "Skipping auto-init. Run 02b-init-mysql.sh separately from inside the VPC or bastion."

ok "Infrastructure ready."
