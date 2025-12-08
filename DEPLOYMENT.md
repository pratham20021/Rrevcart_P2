# RevCart Deployment Guide

## Jenkins Setup

### 1. Install Jenkins
```bash
# On Ubuntu/Debian
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins
sudo systemctl start jenkins
```

### 2. Install Required Plugins
- Go to Jenkins Dashboard → Manage Jenkins → Manage Plugins
- Install:
  - Docker Pipeline
  - Git Plugin
  - Maven Integration
  - NodeJS Plugin

### 3. Configure Jenkins Tools
**Manage Jenkins → Global Tool Configuration**

**Maven:**
- Name: Maven-3.8
- Install automatically: Yes

**NodeJS:**
- Name: NodeJS-18
- Install automatically: Yes

**Docker:**
- Already installed on Jenkins server

### 4. Add Credentials
**Manage Jenkins → Manage Credentials**

**GitHub Credentials:**
- Kind: Username with password
- ID: `github-credentials`
- Username: Your GitHub username
- Password: GitHub Personal Access Token

**Docker Hub Credentials:**
- Kind: Username with password
- ID: `dockerhub-credentials`
- Username: Your Docker Hub username
- Password: Docker Hub password/token

### 5. Create Jenkins Pipeline Job
1. New Item → Pipeline
2. Name: `RevCart-Pipeline`
3. Pipeline Definition: Pipeline script from SCM
4. SCM: Git
5. Repository URL: `https://github.com/pratham20021/Rrevcart_P2.git`
6. Credentials: Select github-credentials
7. Branch: `*/master`
8. Script Path: `Jenkinsfile`
9. Save

### 6. Run Pipeline
- Click "Build Now"
- Monitor console output

---

## Docker Deployment

### Option 1: Local Docker Deployment

**Build and Run:**
```bash
# Clone repository
git clone https://github.com/pratham20021/Rrevcart_P2.git
cd Rrevcart_P2

# Set environment variables
export MAIL_USERNAME=your-email@gmail.com
export MAIL_PASSWORD=your-app-password
export GOOGLE_CLIENT_ID=your-client-id
export GOOGLE_CLIENT_SECRET=your-client-secret

# Build and start all services
docker-compose up -d --build
```

**Check Status:**
```bash
docker-compose ps
docker-compose logs -f
```

**Stop Services:**
```bash
docker-compose down
```

### Option 2: Docker Hub Deployment

**1. Build Images:**
```bash
# Backend services
cd microservices
mvn clean package -DskipTests

# Build each service
docker build -t yourusername/revcart-api-gateway:latest ./api-gateway
docker build -t yourusername/revcart-auth-service:latest ./auth-service
docker build -t yourusername/revcart-user-service:latest ./user-service
docker build -t yourusername/revcart-product-service:latest ./product-service
docker build -t yourusername/revcart-cart-service:latest ./cart-service
docker build -t yourusername/revcart-order-service:latest ./order-service
docker build -t yourusername/revcart-payment-service:latest ./payment-service
docker build -t yourusername/revcart-notification-service:latest ./notification-service
docker build -t yourusername/revcart-delivery-service:latest ./delivery-service
docker build -t yourusername/revcart-analytics-service:latest ./analytics-service
docker build -t yourusername/revcart-admin-service:latest ./admin-service

# Frontend
cd ../revcart-frontend
docker build -t yourusername/revcart-frontend:latest .
```

**2. Push to Docker Hub:**
```bash
docker login
docker push yourusername/revcart-api-gateway:latest
docker push yourusername/revcart-auth-service:latest
# ... push all other services
```

**3. Pull and Run on Server:**
```bash
docker pull yourusername/revcart-api-gateway:latest
# ... pull all services
docker-compose up -d
```

---

## Access Application

- **Frontend**: http://localhost:4200
- **API Gateway**: http://localhost:8080
- **Consul**: http://localhost:8500
- **Jenkins**: http://localhost:8080 (if running locally)

---

## Troubleshooting

**Check Logs:**
```bash
docker-compose logs service-name
docker logs container-name
```

**Restart Service:**
```bash
docker-compose restart service-name
```

**Rebuild Service:**
```bash
docker-compose up -d --build service-name
```

**Clean Everything:**
```bash
docker-compose down -v
docker system prune -a
```

---

## Production Deployment

### Using Kubernetes (Optional)
```bash
# Convert docker-compose to k8s
kompose convert -f docker-compose.yml

# Deploy to k8s
kubectl apply -f .
```

### Using AWS ECS/EKS
- Push images to AWS ECR
- Create ECS task definitions
- Deploy using ECS/EKS

### Using Azure Container Instances
- Push images to Azure ACR
- Deploy using Azure Container Instances
