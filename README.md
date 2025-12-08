# RevCart - E-Commerce Microservices Platform

A full-stack e-commerce application built with microservices architecture using Spring Boot and Angular.

## 🏗️ Architecture

### Backend (Microservices)
- **API Gateway** - Entry point for all client requests
- **Auth Service** - Authentication and authorization
- **User Service** - User profile management
- **Product Service** - Product catalog and categories
- **Cart Service** - Shopping cart operations
- **Order Service** - Order processing and management
- **Payment Service** - Payment processing
- **Delivery Service** - Delivery tracking
- **Notification Service** - Email/SMS notifications
- **Analytics Service** - Business analytics
- **Admin Service** - Admin operations

### Frontend
- **Angular 18** - Modern SPA with component-based architecture
- **Responsive Design** - Mobile-first approach
- **Real-time Updates** - WebSocket integration (SockJS + STOMP)

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.1.0**
- **Spring Cloud 2022.0.3**
- **Consul** - Service discovery
- **MySQL** - Relational database
- **MongoDB** - NoSQL database
- **Redis** - Caching
- **OpenFeign** - Inter-service communication
- **Maven** - Build tool

### Frontend
- **Angular 18**
- **TypeScript 5.4.5**
- **RxJS 7.8.1**
- **SockJS & STOMP** - WebSocket client

## 📋 Prerequisites

- Java 17 or higher
- Node.js 18+ and npm
- MySQL 8.0+
- MongoDB 6.0+
- Redis 7.0+
- Consul 1.15+
- Maven 3.8+

## 🔑 Environment Variables

Create a `.env` file or set the following environment variables:

```bash
# Email Configuration
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/pratham20021/Rrevcart_P2.git
cd Rrevcart_P2
```

### 2. Setup Infrastructure
```bash
# Start Consul, MySQL, MongoDB, Redis
cd microservices
start-infrastructure.bat
```

### 3. Configure Databases
```bash
# Create databases (one-time setup)
mysql -u root -p < database-scripts/create-databases.sql

# Migrate data if needed
mysql -u root -p < data-migration/migrate-data.sql
```

### 4. Start Backend Services
```bash
cd microservices
start-all-microservices.bat
```

### 5. Start Frontend
```bash
cd revcart-frontend
npm install
npm start
```

### 6. Access Application
- **Frontend**: http://localhost:4200
- **API Gateway**: http://localhost:8080
- **Consul UI**: http://localhost:8500

## 📁 Project Structure

```
Revcart/
├── microservices/
│   ├── api-gateway/          # Port 8080
│   ├── auth-service/         # Port 8081
│   ├── user-service/         # Port 8082
│   ├── product-service/      # Port 8083
│   ├── cart-service/         # Port 8084
│   ├── order-service/        # Port 8085
│   ├── payment-service/      # Port 8086
│   ├── notification-service/ # Port 8087
│   ├── delivery-service/     # Port 8088
│   ├── analytics-service/    # Port 8089
│   ├── admin-service/        # Port 8090
│   ├── docker-compose.yml
│   └── pom.xml
└── revcart-frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   ├── services/
    │   │   └── models/
    │   └── environments/
    └── package.json
```

## 🔧 Configuration

### Backend Services
Each microservice has `application.properties` in `src/main/resources/`:
- Database connections
- Consul registration
- Service ports
- Redis configuration

### Frontend
Environment files in `src/environments/`:
- `environment.ts` - Development
- `environment.prod.ts` - Production

## 🧪 Testing

### Backend
```bash
cd microservices
mvn test
```

### Frontend
```bash
cd revcart-frontend
npm test
```

## 📦 Build

### Backend
```bash
cd microservices
mvn clean package
```

### Frontend
```bash
cd revcart-frontend
npm run build
```

## 🐳 Docker Support

```bash
cd microservices
docker-compose up -d
```

## 📡 API Documentation

Swagger UI available for each service:
- API Gateway: http://localhost:8080/swagger-ui.html
- Auth Service: http://localhost:8081/swagger-ui.html
- Product Service: http://localhost:8083/swagger-ui.html
- (etc.)

## 🔐 Security

- JWT-based authentication
- Role-based access control (ADMIN, USER)
- Password encryption with BCrypt
- CORS configuration

## 📊 Monitoring

- Spring Boot Actuator endpoints
- Consul health checks
- Service discovery dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Spring Boot team
- Angular team
- Open source community
