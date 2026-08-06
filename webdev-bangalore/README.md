# InSeirou labs — Full-Stack Web Application

**Bangalore's Premier Web Development Studio**  
A production-grade, cloud-native web application built with React, Spring Cloud Microservices, Redis Cluster, Apache Kafka, and MySQL — fully Dockerized and Kubernetes-ready.

---

## 🏗️ Architecture Overview

```
Browser
  │
  ▼
[ React Frontend (Nginx) ] ──► [ API Gateway (Spring Cloud Gateway) ]
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              ▼                          ▼                          ▼
     [ User Service ]         [ Contact Service ]        [ Project Service ]
              │                          │                          │
              └──────────────────────────┴──────────────────────────┘
                              │ (Kafka: audit-log topic)
                              ▼
                      [ Audit Service ]  ◄── Kafka Consumer
                              │
                     [ MySQL (webdev_audit) ]

Shared Infrastructure:
  ├── MySQL 8          (4 databases: users, contacts, projects, audit)
  ├── Redis Cluster    (6 nodes: 3 master + 3 replica, LRU cache)
  ├── Apache Kafka     (3 brokers + Zookeeper, replication factor 3)
  └── Eureka Server    (Spring Cloud service discovery)
```

---

## 📁 Project Structure

```
webdev-bangalore/
├── frontend/                    # React + Tailwind CSS
│   ├── src/
│   │   ├── pages/               # Home, Services, Projects, About, Contact
│   │   ├── components/          # Navbar, Footer
│   │   └── services/            # Axios API layer
│   ├── nginx.conf               # Production Nginx config
│   └── Dockerfile
│
├── backend/
│   ├── eureka-server/           # Spring Cloud Netflix Eureka (service registry)
│   ├── api-gateway/             # Spring Cloud Gateway (routing, CORS, circuit breaker)
│   ├── user-service/            # User CRUD + JWT auth + Redis cache + Kafka producer
│   ├── contact-service/         # Contact form + Redis cache + Kafka producer
│   ├── project-service/         # Portfolio CRUD + Redis cache + Kafka producer
│   └── audit-service/           # Kafka consumer → persists all audit events to MySQL
│
├── infrastructure/
│   ├── mysql/init.sql            # Database + user initialization
│   ├── redis/                    # Redis cluster config + init script
│   ├── kafka/create-topics.sh    # Kafka topic creation
│   └── kubernetes/
│       ├── onprem/               # On-premises Kubernetes manifests
│       │   ├── 00-namespace-config.yaml
│       │   ├── 01-mysql.yaml
│       │   ├── 02-redis-cluster.yaml
│       │   ├── 03-kafka.yaml
│       │   ├── 04-backend-services.yaml
│       │   └── 05-frontend-ingress.yaml
│       └── aws/                  # AWS EKS manifests (uses RDS/ElastiCache/MSK)
│           ├── 00-namespace-config.yaml
│           ├── 01-backend-services.yaml
│           └── 02-frontend-ingress-hpa.yaml
│
├── scripts/
│   ├── build-and-push.sh        # Build Docker images (local or ECR)
│   └── deploy-k8s.sh            # Deploy to K8s (onprem or aws)
│
└── docker-compose.yml           # Complete local development stack
```

---

## 🛠️ Tech Stack

| Layer                 | Technology                                   |
| --------------------- | -------------------------------------------- |
| **Frontend**          | React 18, Tailwind CSS 3, Vite, React Router |
| **API Gateway**       | Spring Cloud Gateway, Netflix Eureka Client  |
| **Microservices**     | Spring Boot 3.2, Spring Cloud 2023, Java 17  |
| **Service Discovery** | Spring Cloud Netflix Eureka                  |
| **Caching**           | Redis Cluster (6 nodes), Spring Data Redis   |
| **Messaging**         | Apache Kafka (3 brokers), Spring Kafka       |
| **Database**          | MySQL 8.0, Spring Data JPA, Hibernate        |
| **Auth**              | Spring Security + JWT (jjwt)                 |
| **Containerization**  | Docker, Docker Compose                       |
| **Orchestration**     | Kubernetes (on-prem + AWS EKS)               |
| **AWS Services**      | EKS, RDS, ElastiCache, MSK, ECR, ALB, ACM    |

---

## 🚀 Quick Start — Local Development

### Prerequisites

- Docker Desktop ≥ 24.0
- Docker Compose ≥ 2.0
- Node.js 20 (for frontend dev only)
- Java 17 (for backend dev only)

### 1. Start the entire stack

```bash
git clone <repo-url>
cd webdev-bangalore

# Start all services (MySQL, Redis, Kafka, all microservices, Frontend)
docker compose up --build -d

# Watch logs
docker compose logs -f
```

### 2. Access the application

| Service              | URL                   |
| -------------------- | --------------------- |
| **Frontend**         | http://localhost:3000 |
| **API Gateway**      | http://localhost:8080 |
| **Eureka Dashboard** | http://localhost:8761 |
| **Kafka UI**         | http://localhost:8090 |
| **User Service**     | http://localhost:8081 |
| **Contact Service**  | http://localhost:8082 |
| **Project Service**  | http://localhost:8083 |
| **Audit Service**    | http://localhost:8084 |

### 3. Test the APIs

```bash
# Submit a contact form
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Ravi Kumar","email":"ravi@example.com","message":"Hello, I need a website!"}'

# Get all projects
curl http://localhost:8080/api/projects

# Get all users
curl http://localhost:8080/api/users

# Health check
curl http://localhost:8080/actuator/health
```

### 4. Stop the stack

```bash
docker compose down
docker compose down -v   # Also remove volumes
```

---

## 🐳 Docker Build

### Build all images locally

```bash
chmod +x scripts/build-and-push.sh
./scripts/build-and-push.sh local
```

### Build and push to AWS ECR

```bash
./scripts/build-and-push.sh aws <YOUR_AWS_ACCOUNT_ID> ap-south-1
```

---

## ☸️ Kubernetes Deployment

### On-Premises

**Prerequisites:**

- Kubernetes cluster (v1.28+)
- `kubectl` configured
- Nginx Ingress Controller installed
- cert-manager installed (for TLS)
- Local storage provisioner configured

```bash
chmod +x scripts/build-and-push.sh scripts/deploy-k8s.sh

# 1. Build images
./scripts/build-and-push.sh local

# 2. Load images into cluster nodes (for local/on-prem)
# (or push to a private registry and update image references)

# 3. Deploy
./scripts/deploy-k8s.sh onprem

# 4. Check deployment
kubectl get all -n webdev
```

### AWS EKS

**Prerequisites:**

- EKS cluster (v1.28+) in ap-south-1
- AWS Load Balancer Controller installed
- Amazon RDS for MySQL (replace endpoint in ConfigMap)
- Amazon ElastiCache (Redis, cluster mode enabled — replace endpoint)
- Amazon MSK (replace bootstrap brokers)
- ACM certificate for your domain

```bash
# 1. Update AWS endpoints in infrastructure/kubernetes/aws/00-namespace-config.yaml
# 2. Update image URIs in 01-backend-services.yaml with your ECR account ID
# 3. Update ACM certificate ARN in 02-frontend-ingress-hpa.yaml

# Build and push to ECR
./scripts/build-and-push.sh aws <YOUR_AWS_ACCOUNT_ID> ap-south-1

# Deploy to EKS
./scripts/deploy-k8s.sh aws

# Check pods
kubectl get pods -n webdev
kubectl get ingress -n webdev
```

---

## 📊 Kafka Topics

| Topic                   | Partitions | Replication | Purpose                  |
| ----------------------- | ---------- | ----------- | ------------------------ |
| `audit-log`             | 6          | 3           | All service audit events |
| `contact-notifications` | 3          | 3           | New contact form alerts  |
| `user-events`           | 3          | 3           | User lifecycle events    |
| `project-events`        | 3          | 3           | Project lifecycle events |
| `audit-log-dlq`         | 3          | 2           | Dead letter queue        |

---

## 🔴 Redis Caching Strategy

| Cache Key        | TTL    | Service         |
| ---------------- | ------ | --------------- |
| `users::all`     | 30 min | user-service    |
| `users::{id}`    | 30 min | user-service    |
| `contacts::all`  | 30 min | contact-service |
| `projects::all`  | 15 min | project-service |
| `projects::{id}` | 15 min | project-service |

Cache is evicted on write operations (`@CacheEvict`).

---

## 🔒 Security

- Spring Security on all microservices
- JWT token authentication on user-service
- API Gateway enforces CORS headers
- Non-root Docker containers (dedicated appuser)
- Kubernetes NetworkPolicy restricts inter-pod traffic
- Secrets stored in Kubernetes Secrets (use AWS Secrets Manager in production)
- MySQL connections over SSL in production

---

## 📍 Contact

**InSeirou Labs**  
Madiwala, Bangalore, Karnataka 560068  
📧 sambasivareddy.g@gmail.com | 📞 +91 9986067474
